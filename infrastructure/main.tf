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
  database_name         = "${var.database_name}"
  postgresql_user       = "${var.postgresql-admin-username}"
  sku_name              = "${var.sku_name}"
  sku_capacity          = "${var.capacity}"
  postgresql_version    = "${var.postgresql_version}"
  sku_tier              = "${var.sku_tier}"
  common_tags           = "${var.common_tags}"
  subscription          = "${var.subscription}"
}

data "azurerm_key_vault" "key_vault" {
    name = "${local.shared_vault_name}"
    resource_group_name = "${local.shared_vault_name}"
}

/*
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
*/

#save DB details to Azure Key Vault

module "key-vault" {
  source                      = "git@github.com:hmcts/cnp-module-key-vault?ref=master"
  name                        = "${local.shared_vault_name}"
  product                     = "${var.product}"
  env                         = "${var.env}"
  tenant_id                   = "${var.tenant_id}"
  object_id                   = "${var.jenkins_AAD_objectId}"
  product_group_object_id     = "38f9dea6-e861-4a50-9e73-21e64f563537"
  resource_group_name         = "${azurerm_resource_group.rg.name}"
  managed_identity_object_id  = "${var.managed_identity_object_id}"
  common_tags                 = "${var.common_tags}"
}

resource "azurerm_key_vault_secret" "postgresql-pw" {
  key_vault_id = "${data.azurerm_key_vault.key_vault.id}"
  name         = "postgresql-admin-pw"
  value        = "${module.db.postgresql_password}"
}



