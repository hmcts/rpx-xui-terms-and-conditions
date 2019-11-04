variable "product" {
  type    = "string"
}

/*
variable "raw_product" {
  default = "rpe" // jenkins-library overrides product for PRs and adds e.g. pr-118-rpe-...
}
*/

variable "component" {
  type = "string"
}

variable "location_app" {
  type    = "string"
  default = "UK South"
}

variable "location_db" {
  type    = "string"
  default = "UK South"
}

variable "shared_product_name" {
    default = "rpx"
}

variable "appinsights_location" {
  type        = "string"
  default     = "West Europe"
  description = "Location for Application Insights"
}

variable "application_type" {
  type        = "string"
  default     = "Web"
  description = "Type of Application Insights (Web/Other)"
}

variable "env" {
  type = "string"
}

/*
variable "vault_section" {
  type = "string"
  description = "Name of the environment-specific section in Vault key path, i.e. secret/{vault_section}/..."
  default = "test"
}
*/

variable "capacity" {
  default = "2"
}

variable "sku_name" {
  default = "GP_Gen5_2"
}

variable "sku_tier" {
  default = "GeneralPurpose"
}

variable "postgresql_version" {
  default = "11"
}

variable "database_name" {
  default = "xui_tc"
}

variable "tenant_id" {}

/*
variable "ilbIp" {}


variable "tenant_id" {}

variable "client_id" {
  description = "(Required) The object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies. This is usually sourced from environment variables and not normally required to be specified."
}

variable scheduling_lock_at_most_for {
  default = "PT10M"
  description = "For how long to keep the lock of the specific task"
}

*/
variable "subscription" {}

variable "common_tags" {
  type = "map"
}

variable "postgresql_user" {
  default = "postgresql_admin"
}
