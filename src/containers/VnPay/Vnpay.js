// import { VNPay, ignoreLogger, ProductCode, VnpLocale ,consoleLogger  } from "vnpay";

// const vnpay = new VNPay({
//   tmnCode: process.env.VNP_TMN_CODE,
//   secureSecret: process.env.VNP_SECURE_SECRET,
//   vnpayHost: process.env.VNPAY_HOST,
//   testMode: true, // tùy chọn
//   hashAlgorithm: process.env.HASH_ALGORITHM_VNPAY, // tùy chọn

//   /**
//    * Sử dụng enableLog để bật/tắt logger
//    * Nếu enableLog là false, loggerFn sẽ không được sử dụng trong bất kỳ phương thức nào
//    */
//   enableLog: true, // tùy chọn

//   /**
//    * Hàm `loggerFn` sẽ được gọi để ghi log
//    * Mặc định, loggerFn sẽ ghi log ra console
//    * Bạn có thể ghi đè loggerFn để ghi log ra nơi khác
//    *
//    * `ignoreLogger` là một hàm không làm gì cả
//    */
//   loggerFn: ignoreLogger, // tùy chọn
// });

// const paymentUrl = vnpay.buildPaymentUrl(
//     {
//         vnp_Amount: 10000,
//         vnp_IpAddr: '1.1.1.1',
//         vnp_TxnRef: '123456',
//         vnp_OrderInfo: 'Payment for order 123456',
//         vnp_OrderType: ProductCode.Other,
//         vnp_ReturnUrl: `http://localhost:${process.env.PORT}/vnpay-return`,
//     },
//     {
//         logger: {
//             type: 'pick', // Chế độ chọn trường log, có thể là 'pick', 'omit' hoặc 'all'
//             fields: ['createdAt', 'method', 'paymentUrl'], // Chọn các trường cần log
//             loggerFn: consoleLogger, // Log dữ liệu ra console, có thể thay bằng hàm khác
//         },
//     },
// );