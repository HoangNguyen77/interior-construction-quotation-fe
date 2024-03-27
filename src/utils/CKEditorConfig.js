const CKEditorConfig = {
    ckfinder: {
        uploadUrl: 'https://example.com/upload', // Đường dẫn tới trang xử lý tải lên ảnh
        options: {
            resourceType: 'Images'
        },
        cors: {
            origin: 'http://localhost:5173',
            credentials: true // Nếu bạn sử dụng cookie hoặc header xác thực, hãy đặt giá trị này thành true
        },
    }
};

export default CKEditorConfig;
