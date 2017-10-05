package services.infra

import com.google.api.client.json.jackson2.JacksonFactory
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport
import com.google.api.services.compute.Compute
import com.google.api.services.compute.ComputeScopes
import com.google.api.services.compute.model.Instance

// for java list / map conversion
import scala.collection.JavaConverters._

// for java collections
import java.util.Collections

import models.GoogleComputeMachine


/**
 * See docs:
 *
 * https://github.com/google/google-api-java-client-samples/blob/master/compute-engine-cmdline-sample/src/main/java/com/google/api/services/samples/computeengine/cmdline/ComputeEngineSample.java
 * https://developers.google.com/identity/protocols/application-default-credentials
 *
 * https://developers.google.com/resources/api-libraries/documentation/compute/v1/java/latest/
 */
class GoogleComputeService(val applicationName: String, val projectId: String, val zoneId: String) {
  private def getCredential(): GoogleCredential  = {
    val credential = GoogleCredential.getApplicationDefault()

    if (credential.createScopedRequired()) {
      return credential.createScoped(Collections.singletonList(ComputeScopes.COMPUTE))
    } else {
      return credential
    }

  }

  private def getComputeEngine(): Compute = {
    val httpTransport = GoogleNetHttpTransport.newTrustedTransport()
    val credential = this.getCredential()
    val jsonFactory = JacksonFactory.getDefaultInstance()

    val builder = new Compute.Builder(
      httpTransport, jsonFactory, this.getCredential())

    builder.setApplicationName(this.applicationName)

    return builder.build()
  }

  def getInstances(compute: Compute): List[Instance] = {
    val instanceList = compute.instances().list(this.projectId, this.zoneId).execute().getItems()

    instanceList match {
      case null =>
        return List()
      case _ =>
        instanceList.asScala.toList
    }
  }

  def getMachines(): List[GoogleComputeMachine] = {
    this.getInstances(this.getComputeEngine()).map(i => new GoogleComputeMachine(i))
 }
}
