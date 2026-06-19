$client = New-Object System.Net.WebClient
$client.DownloadFile("https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip", "maven.zip")
Expand-Archive maven.zip -DestinationPath . -Force
.\apache-maven-3.9.6\bin\mvn.cmd clean compile exec:java
