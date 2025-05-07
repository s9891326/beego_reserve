### 預約系統

## TODO
1. cicd
2. 確認雲端服務
3. 前端dockerfile
4. google、line登入
5. 客人預約 
6. 雇主能設定休息日期、時間
7. 

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
docker-compose up -d &&
docker-compose restart nginx &&
docker system prune -f
```
