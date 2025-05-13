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

## Create VM
```shell
# install git
apt update
apt install -y git
git --version

# install docker、docker-compose
# 安裝必要套件
sudo apt install -y ca-certificates curl gnupg

# 新增 Docker GPG 金鑰
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# 新增 Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) \
  signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新並安裝 Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 啟動 Docker 並開機自動啟動
sudo systemctl start docker
sudo systemctl enable docker

```
