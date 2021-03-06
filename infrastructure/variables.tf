variable "product" {}

variable "component" {}

variable "location_app" {
  default = "UK South"
}

variable "location_db" {
  default = "UK South"
}

variable "shared_product_name" {
    default = "rpx"
}

variable "env" {}

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

variable "jenkins_AAD_objectId" {
  description = "(Required) The Azure AD object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies."
}

variable "postgresql-admin-username" {
  default="postgresql_admin"
}

variable "managed_identity_object_id" {
  default = ""
}
