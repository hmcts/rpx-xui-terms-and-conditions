provider "azurerm" {
  version = "1.23.0"
}

# Make sure the resource group exists
resource "azurerm_resource_group" "rg" {
  name     = "${var.product}-${var.component}-${var.env}"
  location = "${var.location_app}"
}

locals {
  local_env = "${(var.env == "preview" || var.env == "spreview") ? (var.env == "preview" ) ? "aat" : "saat" : var.env}"

}

module "db" {
  source          = "git@github.com:hmcts/cnp-module-postgres?ref=master"
  product         = "${var.product}-${var.component}-db"
  location        = "${var.location_db}"
  env             = "${var.env}"
  database_name   = "xui_tc"
  postgresql_user = "xui_dbadmin"
  sku_name        = "GP_Gen5_2"
  postgresql_version = "11"
  sku_tier        = "GeneralPurpose"
  common_tags     = "${var.common_tags}"
  subscription    = "${var.subscription}"
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