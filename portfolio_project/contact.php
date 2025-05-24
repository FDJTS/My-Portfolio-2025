<?php
<?php
header('Content-Type: application/json');

// تحقق من أن الطلب هو POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'الطريقة غير مسموحة']);
    exit;
}

// استقبال البيانات
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$message = trim($_POST['message'] ?? '');

// تحقق من صحة البيانات
if ($name === '' || $email === '' || $message === '') {
    echo json_encode(['success' => false, 'message' => 'كل الحقول مطلوبة']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'البريد الإلكتروني غير صحيح']);
    exit;
}

// حفظ الرسالة في ملف (اختياري)
$log = date('Y-m-d H:i:s') . " | $name <$email>: $message\n";
file_put_contents('messages.txt', $log, FILE_APPEND);

// إرسال بريد إلكتروني حقيقي
$to = 'zyadmohamed343@gmail.com';
$subject = 'رسالة جديدة من موقعك الشخصي';
$body = "الاسم: $name\nالبريد: $email\n\nالرسالة:\n$message";
$headers = "From: $email\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8";

$mailSent = mail($to, $subject, $body, $headers);

if ($mailSent) {
    echo json_encode(['success' => true, 'message' => 'تم إرسال رسالتك بنجاح! سيتم الرد عليك قريباً.']);
} else {
    echo json_encode(['success' => false, 'message' => 'حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى لاحقاً.']);
}