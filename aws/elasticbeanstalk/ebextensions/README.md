## ebextensions 설정하기

### `01_nginx.config`

```
files:
  "/etc/nginx/conf.d/01_proxy.conf":
    mode: "000644"
    owner: root
    group: root
    content: |
      client_max_body_size 20M;

  "/etc/nginx/conf.d/02_app_server.conf":
    mode: "000644"
    owner: root
    group: root
    content: |
      # The content of this file is based on the content of /etc/nginx/conf.d/webapp_healthd.conf

      # Change the name of the upstream because it can't have the same name
      # as the one defined by default in /etc/nginx/conf.d/webapp_healthd.conf
      upstream new_upstream_name {
        server unix:///var/run/puma/my_app.sock;
      }

      # Change the name of the log_format because it can't have the same name
      # as the one defined by default in /etc/nginx/conf.d/webapp_healthd.conf
      log_format new_log_name_healthd '$msec"$uri"'
                      '$status"$request_time"$upstream_response_time"'
                      '$http_x_forwarded_for';

      server {
        listen 80;
        server_name domainname.com; ### 여기에 도메인 이름을 적도록 하자!!  

        if ($time_iso8601 ~ "^(\d{4})-(\d{2})-(\d{2})T(\d{2})") {
          set $year $1;
          set $month $2;
          set $day $3;
          set $hour $4;
        }

        access_log  /var/log/nginx/access.log  main;
        # Match the name of log_format directive which is defined above
        access_log /var/log/nginx/healthd/application.log.$year-$month-$day-$hour new_log_name_healthd;

        location / {
          ####### if ( http 요청을 https로 redirect 시키고 싶다면 ) do #####
          set $redirect 0;
          if ($http_x_forwarded_proto != "https") {
            set $redirect 1;
          }
          if ($http_user_agent ~* "ELB-HealthChecker") {
            set $redirect 0;
          }
          if ($redirect = 1) {
            return 301 https://$host$request_uri;
          }
          ######## end ##################################################
          proxy_pass http://my_app; # match the name of upstream directive which is defined above
          proxy_set_header Host $host;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /assets {
          alias /var/app/current/public/assets;
          gzip_static on;
          gzip on;
          expires max;
          add_header Cache-Control public;
        }

        location /public {
          alias /var/app/current/public;
          gzip_static on;
          gzip on;
          expires max;
          add_header Cache-Control public;
        }

        location /files {
          alias /var/app/current/public/ridiculously/long/path/to/files;
          gzip_static on;
          gzip on;
          expires max;
          add_header Cache-Control public;
        }
      }

container_commands:
  01_reload_nginx:
    command: "sudo service nginx reload"
```
