provider "azurerm" {
  version = "1.23.0"
}

resource "azurerm_resource_group" "rg" {
  name     = "${var.product}-${var.component}-${var.env}"
  location = "${var.location_app}"
}

locals {
  local_env = "${(var.env == "preview" || var.env == "spreview") ? (var.env == "preview" ) ? "aat" : "saat" : var.env}"

  shared_vault_name = "${var.shared_product_name}-${local.local_env}"

}

module "db" {
  source                = "git@github.com:hmcts/cnp-module-postgres?ref=master"
  product               = "${var.product}-${var.component}"
  location              = "${var.location_db}"
  env                   = "${var.env}"
  database_name         = "xui_tc"
  postgresql_user       = "${data.azurerm_key_vault_secret.db_admin.value}"
  sku_name              = "GP_Gen5_4"
  sku_capacity          = "4"
  postgresql_version    = "11"
  sku_tier              = "GeneralPurpose"
  common_tags           = "${var.common_tags}"
  subscription          = "${var.subscription}"
}

data "azurerm_key_vault" "key_vault" {
    name = "${local.shared_vault_name}"
    resource_group_name = "${local.shared_vault_name}"
}

data "azurerm_key_vault_secret" "s2s_secret" {
    name = "xui-s2s-token"
    vault_uri = "${data.azurerm_key_vault.key_vault.vault_uri}"
}

data "azurerm_key_vault_secret" "oauth2_secret" {
    name = "xui-oauth2-token"
    vault_uri = "${data.azurerm_key_vault.key_vault.vault_uri}"
}

data "azurerm_key_vault_secret" "db_admin" {
    name = "postgresql-admin-username"
    vault_uri = "${data.azurerm_key_vault.key_vault.vault_uri}"
}


