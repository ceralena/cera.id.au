package models

import com.google.api.services.compute.model.Instance

// for java list / map conversion
import scala.collection.JavaConverters._

object instanceHelper {
  /**
   * Labels is a null java object when empty
   *
   * This is a helper to normalise that.
   */
  def getLabels(instance: Instance): Map[String, String] = {
    val labels = instance.getLabels()
    labels match {
      case null => Map()
      case _ => labels.asScala.toMap
    }
  }
}

class GoogleComputeMachine(val name: String, val instanceId: String, val status: String, val labels: Map[String, String]) {
  def getAvailableActions(): Array[String] = {
    /*
     * Possible statuses:
     *
     * PROVISIONING, STAGING, RUNNING, STOPPING, STOPPED, SUSPENDING, SUSPENDED, and TERMINATED.
     *
     * See https://cloud.google.com/compute/docs/reference/latest/instances#resource
     */
    this.status match {
      case "RUNNING"   => Array("stop", "suspend")
      case "STOPPED"   => Array("run")
      case "SUSPENDED" => Array("resume")
    }
  }

  def this(instance: Instance) = {
    this(instance.getName(), instance.getId().toString(), instance.getStatus(), instanceHelper.getLabels(instance))
  }
}
