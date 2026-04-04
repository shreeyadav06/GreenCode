if (!$env:JAVA_HOME) { 
    $env:JAVA_HOME="C:\Program Files\Java\jdk-25" 
}
$repo = "C:\Users\shree\.m2\repository\com\fasterxml\jackson\core"
$cp = ".;$repo\jackson-databind\2.16.1\jackson-databind-2.16.1.jar;$repo\jackson-core\2.16.1\jackson-core-2.16.1.jar;$repo\jackson-annotations\2.16.1\jackson-annotations-2.16.1.jar"

if (!(Test-Path target/classes)) { New-Item -ItemType Directory -Path target/classes }

Write-Host "Compiling GreenCode Backend..."
& "$env:JAVA_HOME\bin\javac.exe" -d target/classes -cp $cp src/main/java/com/tracker/model/*.java src/main/java/com/tracker/service/*.java src/main/java/com/tracker/server/*.java src/main/java/com/tracker/*.java

if ($LASTEXITCODE -eq 0) {
    Write-Host "Starting GreenCode Backend..."
    & "$env:JAVA_HOME\bin\java.exe" -cp "target/classes;$cp" com.tracker.Main
} else {
    Write-Host "Compilation failed."
}
