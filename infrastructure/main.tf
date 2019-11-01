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
  sku_tier        = "GeneralPurpose"
  common_tags     = "${var.common_tags}"
  subscription    = "${var.subscription}"
}


data "azurerm_key_vault" "s2s_key_vault" {
  name                = "s2s-${local.local_env}"
  resource_group_name = "${local.s2s_rg}"
}

resource "azurerm_key_vault_secret" "POSTGRES-USER" {
  key_vault_id = "${module.send-letter-key-vault.key_vault_id}"
  name         = "${var.component}-POSTGRES-USER"
  value        = "${module.db.user_name}"
}

resource "azurerm_key_vault_secret" "POSTGRES-PASS" {
  key_vault_id = "${module.send-letter-key-vault.key_vault_id}"
  name         = "${var.component}-POSTGRES-PASS"
  value        = "${module.db.postgresql_password}"
}
