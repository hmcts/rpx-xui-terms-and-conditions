variable "product" {
  type    = "string"
}

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

variable "env" {
  type = "string"
}

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

variable "subscription" {}

variable "common_tags" {
  type = "map"
}

variable "tenant_id" {}

variable "object_id" {
  type        = "string"
  description = "(Required) The Azure AD object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies."
}

variable "managed_identity_object_id" {
  default = ""
}

variable "product_group_object_id" {
}

variable "postgresql-admin-username" {
  default="postgresql_admin"
}
