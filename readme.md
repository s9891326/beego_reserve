### 預約系統

## docker-compose CI CD
```shell
cd /home/***/BB_Server &&
git checkout dev &&
git pull &&
cd /home/***/BB_Server/resource/foundation/proto &&
git checkout dev &&
git pull &&
cd /home/***/BB_Server/resource &&
sudo go work vendor &&
cd /home/***/BB_Server &&
docker-compose build &&
docker-compse up -d &&
docker-compose restart nginx &&
docker system prune -f
```
