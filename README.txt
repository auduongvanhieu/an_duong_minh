# an_duong_minh

## How to rebuild
- Connect to server
- cd an_duong_minh
- docker-compose up -> control + C (stop docker container)
- docker-compose up (start docker conatainer)

## How to backup and restore db
- Cài mongodump trên máy tính của bạn
- Mở cmd ở thư mục bất kỳ
- Chạy lệnh bên dưới
    + sao lưu: mongodump -h {host}:{post}:27017 -d mongodb_adm -{user} root -p {password} --authenticationDatabase admin -o {your_folder}
    + khôi phục từ file đã sao lưu: mongorestore --uri "new_connect_string" {your_bk_folder}
- ví dụ:
    + mongodump -h 45.117.179.80:27017 -d mongodb_adm -u root -p root123123 --authenticationDatabase admin -o /Users/auduongvanhieu/Downloads
    + mongorestore --uri "mongodb://root:root123123@45.117.179.80:27017/mongodb_adm?authSource=admin" /Users/auduongvanhieu/Downloads/mongodb_adm