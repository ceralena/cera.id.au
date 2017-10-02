package models

import play.api.Configuration

class ContactInfo(config: Configuration) {
  val emailAddress = config.get[String]("emailAddress")
  val github = config.get[String]("github")
  val instagram = config.get[String]("instagram")
  val spotify = config.get[String]("spotify")
}
