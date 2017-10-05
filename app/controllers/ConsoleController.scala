package controllers

import javax.inject._
import play.api._
import play.api.mvc._

import services.infra.GoogleComputeService;

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class ConsoleController @Inject()(cc: ControllerComponents, config: Configuration) extends AbstractController(cc) {
  def index() = Action { implicit request: Request[AnyContent] =>
    val computeService = new GoogleComputeService(
      config.get[String]("applicationName"),
      config.get[String]("googleCloud.projectId"),
      config.get[String]("googleCloud.zoneId")
    );

    // get the list of machines
    val machines = computeService.getMachines()

    Ok(views.html.console(machines))
  }
}
