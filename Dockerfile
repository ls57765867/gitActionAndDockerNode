FROM node:16
#docker运行时工作的目录（不是当前项目的目录）
WORKDIR /app
#复制当前目录的内容到 /app
#不需要的文件放到 dockerigrnone
COPY . /app

#构建镜像时，安装必备的软件，可能有多个RUN
# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

# 启动容器时的CMD 只能有一个
#pm2为阻塞控制台的命令
CMD npm i && npm run serve && npx pm2 log
