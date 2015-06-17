Từ lâu, mình đã có ý định viết một Chrome Extension đơn giản để vọc chơi mà chưa có ý tưởng gì thiết thực và hữu ích. Trong quá trình làm Project Công ty thì có biết và tìm hiểu qua về API của Imgur, thấy rằng Dịch vụ upload ảnh miễn phí của nó rất tốt, account free được tối đa 1250 upload / ngày và 12500 requests / ngày. Như thế là rất dư dùng cho người dùng cá nhân rồi. Cộng thêm qua Kipalog.com, mới biết một chức năng khá hay của HTML5 (và chỉ tương thích với Google Chrome) là Copy Ảnh từ Web Page và xử lý Ảnh đó thành chuỗi Base64, mà Imgur thì có hỗ trợ upload Ảnh bằng chuỗi Base64. Woa, các yếu tố này gợi đến ý tưởng, vậy sao mình không viết một chrome extension vậy ta, dù sao thì đoạn Code nó cũng chỉ chạy được trên Google Chrome thôi mà. Vậy là sau 1 buổi hí hoáy ngồi code code và thêm 1 buổi nữa cải tiến, thêm thắt chức năng, thế là ==Chrome Extension fImgUr Upload== ra đời.

**Link Project**

https://github.com/viphat/fImgur

**Một số kinh nghiệm rút ra được**:

- Code một Chrome Extension khá đơn giản, vì mình sẽ khai báo các thông tin về Extension cũng như Browser Action / Page Action và Permission mà Extension của mình sẽ sử dụng.
- Sử dụng HTML, CSS, Javascript (phải include File .js trực tiếp trong Project, không thông qua Direct Link hay CDN vì vấn đề bảo mật).
- Nếu Browser Action hay Page Action là Popup thì khi Popup bị lost focus, nó sẽ bị tắt. Có một Trick để khắc phục việc này, và mình đã áp dụng, là sử dụng Popup của Chrome Extension để gọi lên một Tab hay một Window khác)

**Thành phẩm**

![Screenshot 1](http://i.imgur.com/b2IRq4a.png)

![Screenshot 2](http://i.imgur.com/9Lq8Erw.png)

**Nguồn tham khảo**

- [HTML5 JavaScript Pasting Image Data in Chrome](http://strd6.com/2011/09/html5-javascript-pasting-image-data-in-chrome/)
- [HTML5 Drag & Drop File to Upload with Progress](http://html5doctor.com/drag-and-drop-to-server/)
- Cùng StackOverflow và một số trang khác...
