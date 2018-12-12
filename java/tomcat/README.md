---
prev: /java/
---
## Tomcat

### What is Tomcat?

The Apache Tomcat® software is an open source implementation of the Java Servlet, JavaServer Pages, Java Expression Language and Java WebSocket technologies. 

### Install ( for Mac )

1. brew install tomcat. ( if "brew" is not installed, install "brew" )
```shell
$ brew install tomcat
```

2. Create Tomcat Symlink
```shell
## if tomcat version 9.0.12
$ sudo ln –s /usr/local/Cellar/tomcat/9.0.12/libexec  /Library/Tomcat

## if tomcat version XX.XX.XX
$ sudo ln –s /usr/local/Cellar/tomcat/XX.XX.XX/libexec  /Library/Tomcat
```

3. chown

```shell
## if your Mac username is jameson
$ sudo chown –R jameson /Library/Tomcat

## if your Mac username is kkk
$ sudo chown –R kkk /Library/Tomcat
```

4. chmod

```
$ sudo chmod +x /Library/Tomcat/bin/*.sh
```

5. Run Tomcat server
```
$ /Library/Tomcat/bin/startup.sh
```

6. Check "http://localhost:8080"
