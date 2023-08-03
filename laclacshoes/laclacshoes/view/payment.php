<?php session_start() ?>

<!DOCTYPE html>
<html lang="en">

<head>

    <title>Cổng thanh toán MoMo</title>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta property="og:locale" content="vi_VN" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="MoMo Payment" />
    <meta property="og:image:width" content="800" />
    <meta property="og:image:height" content="366" />
    <meta property="og:image" content="https://test-payment.momo.vn/qr/banner-payment.jpg" />
    <link
        href='//fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900'
        rel='stylesheet'>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link media="screen" rel="stylesheet" href="/laclacshoes/webroot/v2/gateway/css/core-106823e3a870674f38b0b4767ec4700d.css" />
    <link href="/laclacshoes/webroot/v2/gateway/images/icons/momo-722dd4ed23488fa805aa81f9942d168b.ico" rel="SHORTCUT ICON">
    <script crossorigin="anonymous" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
        src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lazyload@2.0.0-rc.2/lazyload.js"></script>


    <meta content="width=device-width, initial-scale=1" name="viewport">


    <meta name="_csrf" content="98a42401-96c2-4147-bfd3-8a745149e71b" />


    <!-- default header name is X-CSRF-TOKEN -->


    <meta name="_csrf_header" content="X-CSRF-TOKEN" />


    <link media="screen" rel="stylesheet" href="/laclacshoes/webroot/v2/gateway/css/payment-ab4f68c87ebe93f4b666aa1cc2fac83b.css" />


    <link media="screen" rel="stylesheet" href="/laclacshoes/webroot/v2/gateway/css/qr-73cf23d4c28f54bb1ea7dcd33f923b2c.css" />


</head>

<body>
    <header id="header">
        <div class="container">
            <div class="header-wrapper">
                <div class="logo-wrap">
                    <a class="navbar-brand momo-logo">
                        <svg class="svg-icon fill-current imgLogo " fill="#fff" height="87" viewBox="0 0 96 87"
                            width="96" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M75.5326 0C64.2284 0 55.0651 8.74843 55.0651 19.5409C55.0651 30.3333 64.2284 39.0818 75.5326 39.0818C86.8368 39.0818 96 30.3333 96 19.5409C96 8.74843 86.8368 0 75.5326 0ZM75.5326 27.8805C70.7368 27.8805 66.8403 24.1604 66.8403 19.5818C66.8403 15.0031 70.7368 11.283 75.5326 11.283C80.3283 11.283 84.2248 15.0031 84.2248 19.5818C84.2248 24.1604 80.3283 27.8805 75.5326 27.8805ZM49.1561 14.6761V39.1226H37.3809V14.5535C37.3809 12.7138 35.8394 11.2421 33.9126 11.2421C31.9857 11.2421 30.4442 12.7138 30.4442 14.5535V39.1226H18.669V14.5535C18.669 12.7138 17.1276 11.2421 15.2007 11.2421C13.2739 11.2421 11.7324 12.7138 11.7324 14.5535V39.1226H0V14.6761C0 6.58176 6.89385 0 15.372 0C18.8403 0 22.0089 1.10377 24.5781 2.9434C27.1472 1.10377 30.3586 0 33.7841 0C42.2623 0 49.1561 6.58176 49.1561 14.6761ZM75.5326 47.544C64.2284 47.544 55.0651 56.2925 55.0651 67.0849C55.0651 77.8774 64.2284 86.6258 75.5326 86.6258C86.8368 86.6258 96 77.8774 96 67.0849C96 56.2925 86.8368 47.544 75.5326 47.544ZM75.5326 75.4245C70.7368 75.4245 66.8403 71.7044 66.8403 67.1258C66.8403 62.5472 70.7368 58.827 75.5326 58.827C80.3283 58.827 84.2248 62.5472 84.2248 67.1258C84.2248 71.7044 80.3283 75.4245 75.5326 75.4245ZM49.1561 62.2201V86.6667H37.3809V62.0975C37.3809 60.2579 35.8394 58.7862 33.9126 58.7862C31.9857 58.7862 30.4442 60.2579 30.4442 62.0975V86.6667H18.669V62.0975C18.669 60.2579 17.1276 58.7862 15.2007 58.7862C13.2739 58.7862 11.7324 60.2579 11.7324 62.0975V86.6667H0V62.2201C0 54.1258 6.89385 47.544 15.372 47.544C18.8403 47.544 22.0089 48.6478 24.5781 50.4874C27.1472 48.6478 30.3158 47.544 33.7841 47.544C42.2623 47.544 49.1561 54.1258 49.1561 62.2201Z"
                                fill=""></path>
                        </svg>
                    </a>
                    <span class="logo-title">Cổng thanh toán MoMo</span>
                </div>
            </div>
        </div>
    </header>
    <div class="payment-container">
        <div>
            <div id="load">
                <div class="loader">
                    <span class="loader__element"></span>
                    <span class="loader__element"></span>
                    <span class="loader__element"></span>
                </div>
                <span class="text-center">Đang tải dữ liệu giao dịch</span>
            </div>
        </div>
        <div class="d-none container" id="contents">
            <div class="modal-background modal momoModal" id="paymentModal" role="dialog" tabindex="-1">
                <div class="modal-instruction modal-dialog-centered" role="document">
                    <div class="modal-content text-center">
                        <div class="modal-body">
                            <img class="button-modal-close" onclick="closeModal()"
                                src="/laclacshoes/webroot/v2/gateway/images/navigation-close-circle-2a5c5c57ac6079c2fe70f4ee09f98938.svg" />
                            <h5 class="mt-3">Hướng dẫn quét mã</h5>
                            <div class="image-instruction-container">
                                <img
                                    src="/laclacshoes/webroot/v2/gateway/images/ui-scan-instruction-02631b56295aa9dfc04d72a9680363b4.png" />
                            </div>
                            <div class="image-instruction-container">
                                <img
                                    src="/laclacshoes/webroot/v2/gateway/images/ui-scan-instruction-2-32dcd35e61b5a9a2d0bb5c797f98e399.png" />
                            </div>
                            <div class="text-right m-4 mt-5">
                                <a class="momo-color font-weight-bold-600 hover-momo-color hover-none-decoration"
                                    href="#" onclick="return closeModal()">Đóng</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row" id="qr-web-ui">
                <div class="col-lg-8 payment-form" id="form-qr-code">
                    <div class="payment-content" id="body-payment-content">
                        <div id="momo-mark" class="col-sm-10 mx-auto pt-3">
                            <div>
                                <div class="momo-mark">
                                    <img class="img-momo-mark rounded float-left"
                                        src="/laclacshoes/webroot/v2/gateway/images/img-momo-bbd4a4e766f477a64710e8d82d076860.svg">
                                    <a>Bạn đang sử dụng giải pháp thanh toán được xây dựng và cung cấp
                                        bởi MoMo</a>
                                </div>
                            </div>
                        </div>
                        <div class="payment-qr col-sm-7 mx-auto">
                            <div class="payment-cta">
                                <div>
                                    <div>
                                        <ul class="logo-link">
                                            <!-- <li><img class="merchant-logo-link"
                                                    src="https://merchant.momocdn.net/static/gcs_partner_m4b/04694-2022-03-07/wLHomS8fRUD16LFNXdfx_1646631931586">
                                            </li> -->
                                            <li><img class="merchant-logo-link" src="/laclacshoes/webroot/v2/gateway/images/logo.png"></li>

                                            <li><img src="/laclacshoes/webroot/v2/gateway/images/icons/icon-link.svg"></li>
                                            <li><img class="merchant-logo-link" src="/laclacshoes/webroot/v2/gateway/images/logo.png"></li>
                                        </ul>
                                        <h1 style="margin-top: 10px;">Quét mã QR để tiến hành giao dịch</h1>
                                    </div>





                                </div>

                                <a class="cta-app">Sử dụng <b> App MoMo </b> hoặc ứng dụng camera hỗ trợ QR code để quét
                                    mã</a>
                                <p class="text-danger mb-0">Chú ý : Nhập đúng các thông tin chuyển khoản để hệ thống có
                                    thể
                                    xử lí  nhanh nhất.</p>
                            </div>
                            <div class=" text-center ">
                                <img alt="paymentcode" class="image-qr-code"
                                    src="/laclacshoes/laclacshoes/webroot/v2/gateway/images/qr.jpg" />
                                <div style="" class="mt-3">
                                    <p class="text-center"><b>Chuyển tiền vào tài khoản momo dưới đây</b></p>

                                    <div class="d-flex align-items-center flex-column">
                                        <div class="mb-2">
                                            <div class=" d-flex align-items-center text-left " style="width: 340px; ">
                                                <span style="font-size: 16px; margin-right: 5px;"><span
                                                        style="font-weight: 400; color: #3b3a3a;">Chủ tài khoản :</span>
                                                    <b>Hồ Hoàng Khang
                                                        </b></span>

                                            </div>
                                        </div>

                                        <div class="mb-2">
                                            <div class=" d-flex align-items-center text-left " style="width: 340px; ">
                                                <span style="font-size: 16px; margin-right: 5px;"><span
                                                        style="font-weight: 400; color: #3b3a3a;">Số điện thoại
                                                        :</span>
                                                    <b>0901311286</b></span>
                                                <button class="btn-clipboard" title=""
                                                    onclick="copyToClipboard('0901311286')"
                                                    data-original-title="Copy to clipboard">Copy</button>
                                            </div>
                                        </div>


                                        <div class="mb-2">
                                            <div class=" d-flex align-items-center text-left " style="width: 340px; ">
                                                <span style="font-size: 16px; margin-right: 5px;"><span
                                                        style="font-weight: 400; color: #3b3a3a;">Số tiền
                                                        :</span>
                                                    <b><?php echo $_GET["current_order_price"] ?> đ</b></span>
                                                <button class="btn-clipboard" title=""
                                                    onclick="copyToClipboard('<?php echo $_GET["current_order_price"] ?>')"
                                                    data-original-title="Copy to clipboard">Copy</button>
                                            </div>
                                        </div>

                                        <div class="mb-2">
                                            <div class=" d-flex align-items-center text-left " style="width: 340px; ">
                                                <span style="font-size: 16px; margin-right: 5px;"><span
                                                        style="font-weight: 400; color: #3b3a3a;">Nội dung
                                                        :</span>
                                                    <b><?php echo $_GET["ma_khach_hang"] ?></b></span>
                                                <button class="btn-clipboard" title=""
                                                    onclick="copyToClipboard('<?php echo $_GET["ma_khach_hang"] ?>')"
                                                    data-original-title="Copy to clipboard">Copy</button>
                                            </div>
                                        </div>





                                    </div>


                                </div>
                            </div>

                            <div class="justify-content-center m-3 tablet-ui">
                                <button class="form-group btn btn-primary btn-momo" id="payByMomoAppTablet" onclick=""
                                    type="button"></a>Thanh toán bằng Ví MoMo<span class="spinner"></span>
                                </button>
                                <div class="text-center text-description">Hoặc tải ngay trên</div>
                                <div class="d-flex justify-content-center ">
                                    <a id="openAppStoreTablet"><img alt="app-store" class="mx-2"
                                            src="/laclacshoes/webroot/v2/gateway/images/badge-app-store-9af6fdd6b7b734b57efb4506d5d69b1b.svg">
                                    </a>
                                </div>
                            </div>
                        </div>

                        <form action="/laclacshoes/webroot/v2/gateway/action" id="cancel-payment-form" method="post" novalidate>
                            <input name="_csrf" value="98a42401-96c2-4147-bfd3-8a745149e71b" type="hidden" />
                            <input name="sessionId" value="TU9NT0ZWS1EyMDIyMDIxMHxBV1VBQUQ2aWhib2ZxMG94bGlVdFppdW9FTEFL"
                                type="hidden" />
                            <input name="mToken"
                                value="V10dY4jdPasF4zX1H1B6N3KyxuI68kfo0ix53d0VSG2q9Eh06xvYJzWSbBfYCFNupuDBfLggvwwxaJICejNa9UiBftqR9vS1"
                                type="hidden" />
                            <div class="form-group col-sm-4">
                                <button class="btn btn-momo-cancel" id="btn-momo-cancel" name="action"
                                    style="display: none;" type="submit" value="cancel">
                                    Quay lại
                                </button>
                                <button id="btn-momo-expire" name="action" style="display: none;" type="submit"
                                    value="expire">Expire
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
                <div class="col-lg-4 payment-form" id="orderInfo">
                    <div>
                        <div class="info-content">
                            <div class="payment-info payment-info-bottom">


                                <div class="payment-title">
                                    <h1> Thông tin đơn hàng</h1>
                                </div>
                                <div class="payment-detail">
                                    <div class="box-detail">
                                        <h4>Nhà cung cấp</h4>
                                        <div class="two-box">
                                            <img class="merchant-logo"
                                                src="https://merchant.momocdn.net/static/gcs_partner_m4b/04694-2022-03-07/wLHomS8fRUD16LFNXdfx_1646631931586">
                                            <p class="merchant-name">LaclacShoes</p>
                                        </div>
                                    </div>

                                    <div class="line-detail"></div>
                                    <div class="box-detail">
                                        <h4>Mã đơn hàng</h4>
                                        <p><?php echo $_GET['ma_khach_hang'] ?></p>
                                    </div>




                                    <div class="line-detail"></div>
                                    <div class="box-detail">
                                        <h4>Mô tả</h4>
                                        <p>-</p>
                                    </div>




                                    <div class="line-detail"></div>
                                    <div class="box-detail">
                                        <h4>Số tiền</h4>
                                        <h3>0đ</h3>
                                    </div>




                                </div>
                            </div>
                        </div>
                        <div class="expire-content mb-3">
                            <div class="box-expire">
                                <div class="expire-text">
                                    <p>Đơn hàng sẽ hết hạn sau: <br /> <span
                                            class="font-weight-bold time-expire-text d-inline-flex"
                                            name="expiredAt"></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <script>
                            $(".toggle-btn").click(function () {
                                if ($(".text-data-es").hasClass("d-none")) {
                                    $(this).addClass("test")
                                } else {
                                    $(this).addClass("test2")
                                }
                                $(this).toggleClass('active')
                                $(".text-data-es").toggleClass("d-none");
                            });
                        </script>
                    </div>
                    <div class="text-center my-3 font-size-14">
                        <div class="black12-color mr-1 d-inline hover">Gặp khó khăn khi thanh toán?</div>
                        <a class="blue-color font-weight-bold-600 hover-none-decoration" href="#"
                            onclick="return showModal()">Xem Hướng dẫn</a>
                    </div>
                    <div class="text-center my-3 font-size-14 font-weight-bold-600">
                        <a class="momo-color backButton hover-momo-color hover-none-decoration" href="#">Quay về</a>
                    </div>
                </div>
            </div>

        </div>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
        <script>

            function copyToClipboard(text) {
                const tempInput = document.createElement("input");
                tempInput.value = text;
                document.body.appendChild(tempInput);
                tempInput.select();
                tempInput.setSelectionRange(0, 99999);
                document.execCommand("copy");
                document.body.removeChild(tempInput);

                Toastify({
                    text: 'Nội dung đã được copy: ',
                    duration: 3000,
                    close: true,
                    gravity: 'top',
                    position: 'center',
                    stopOnFocus: true,
                    style: {
                        background: '#4BB543',
                    },
                    onClick: function () { }, // Callback after click
                }).showToast();
            }
        </script>

        <script>
            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-MKX4F9JH07');
        </script>
        <script>
            var offset = 5999789;
            var second = offset / 1000;
            var countdown = parseInt(second);
            var offset = 5999789;
            var retry = 500;
            var isTablet = false;
            var device;
            if (false) {
                device = 'mobile';
            } else if (false) {
                device = 'tablet';
            } else device = 'desktop';

            function closeCommonModalAndSendEvent() {
                gtag('event', 'aiopgw_paymodel_momowallet', {
                    'action': 'click_close_pu_walletpgw',
                    'device': device
                });
                $(".common-modal").remove()
            }



            function back() {
                window.location.href = "/laclacshoes"
            }

            document.onreadystatechange = function () {
                "complete" == document.readyState && setTimeout(function () {
                    document.getElementById("interactive"), document.getElementById("load").remove(), document.getElementById("contents").classList.remove("d-none")
                }, 1e3)
            },

                $(document).ready(function () {
                    var e = offset / 1e3, t = parseInt(e), n = setInterval(function () {
                        var a = parseInt(e / 60), c = parseInt(e - 60 * a);
                        e--, t--, a < 10 && (a = "0" + a), c < 10 && (c = "0" + c), $("span[name=expiredAt]").html(a + ":" + c), $("b[name=expiredAt]").html(a + ":" + c), t <= 0 && (clearInterval(n), document.getElementById("btn-momo-expire").click())
                    }, 1e3);
                    $.ajaxSetup({ cache: !1 })
                    setUpDevice();
                    setUpUI();
                });

            function redirect(data) {
                if (data.return_url) {
                    window.location.replace(data.return_url);
                } else if (data.returnUrl) {
                    window.location.replace(data.returnUrl);
                }
            }




            $(document).ready(function () {
                $.ajaxSetup({
                    cache: false
                });
                setTimeout(executeXML, 4000);

            });

            function showModal() {
                gtag('event', 'aiopgw_paymodel_momowallet', {
                    'action': 'click_guide_scr_walletpgw',
                    'device': device
                });
                $('.modal-background').css('display', 'block');
            }

            function closeModal() {
                $('.modal-background').css('display', 'none')
            }

            function setUpDevice() {
                if (!isTablet) {
                    $(".tablet-ui").remove();
                    document.documentElement.style.setProperty('--footer-header-height', $('#header').height() + $('#footer').height() + "px");
                }

            }

            function setUpUI() {
                if ("0" == 0 || "linkWallet" == "subscription") {
                    var expireText = $("<div class='expire-content mb-3'> <div class='box-expire' style='width: 300px; margin: auto'> <div class='expire-text'><p>Đơn hàng sẽ hết hạn sau: <span class='font-weight-bold time-expire-text d-inline-flex' name='expiredAt'></span></p></div></div></div>");
                    var instruction = $("<div class='text-center my-3 font-size-14'><div class='black12-color mr-1 d-inline'>Gặp khó khăn khi thanh toán?</div><a onclick='return showModal()' class='blue-color font-weight-bold-600 hover-none-decoration' href='#'>Xem Hướng dẫn</a></div>");
                    if ("linkWallet" == "topUp") {
                        expireText = $("<div class='expire-content mb-3'> <div class='box-expire' style='width: 300px; margin: auto'> <div class='expire-text'><p>Hết hạn sau: <span class='font-weight-bold time-expire-text d-inline-flex' name='expiredAt'></span></p></div></div></div>");
                        instruction = $("<div class='text-center my-3 font-size-14'><div class='black12-color mr-1 d-inline'>Gặp khó khăn khi thực hiện?</div><a onclick='return showModal()' class='blue-color font-weight-bold-600 hover-none-decoration' href='#'>Xem Hướng dẫn</a></div>");
                    }
                    var backButtonObjectRender = $("<div class='text-center my-3 font-size-14 font-weight-bold-600'><a class='momo-color backButton hover-momo-color hover-none-decoration' href='#'>Quay về</a></div>");

                    $(".payment-qr").css("padding", "15px 0px 15px 0px");

                    $("#orderInfo").remove();
                    $("#momo-mark").remove();
                    $("#form-qr-code").removeClass("col-lg-8");

                    isTablet ? $("#form-qr-code").addClass("col-lg-12") : $("#form-qr-code").addClass("col-lg-12");

                    $(".payment-qr").append(expireText).append(instruction).append(backButtonObjectRender);
                }

                $('.backButton').click(function () {
                    gtag('event', 'aiopgw_paymodel_momowallet', {
                        'action': 'click_back_scr_walletpgw',
                        'device': device
                    });

                    if ("linkWallet" == 'linkWallet') {
                        stringPartner = "Bạn chắc chắn muốn hủy phiên giao dịch hiện tại?";
                        showCommonModal("Hủy phiên giao dịch",
                            stringPartner,
                            "HỦY PHIÊN",
                            "return back()",
                            "ĐÓNG",
                            "return closeCommonModalAndSendEvent()");
                        return false;
                    }

                    if ("linkWallet" == 'topUp') {
                        stringPartner = " Bạn chắc chắn muốn rời khỏi trang quét mã này?";
                        showCommonModal("Rời khỏi trang quét mã?",
                            stringPartner,
                            "ĐỒNG Ý",
                            "return back()",
                            "ĐÓNG",
                            "return closeCommonModalAndSendEvent()");
                        return false;
                    }

                    if ("linkWallet" == 'payWithMethod') {
                        location.reload();
                        return false;
                    }

                    stringPartner = "Bạn chắc chắn muốn hủy giao dịch thanh toán với " + "<strong>" + "TikTok" + "</strong>" + "?";
                    showCommonModal("Huỷ giao dịch thanh toán",
                        stringPartner,
                        "HUỶ GIAO DỊCH",
                        "return back()",
                        "ĐÓNG",
                        "return closeCommonModalAndSendEvent()");
                    return false;
                })
            }
        </script>
        <script src="/laclacshoes/webroot/v2/gateway/sh/scripts/core-ef39ed2e2d51077964a08bede4eadfa0.js"></script>
        <script src="/laclacshoes/webroot/v2/gateway/sh/scripts/pay_later_item-1aff786ba68b1ff9b9ebf0922db935cc.js"></script>
    </div>
    <div>
        <footer id="footer">
            <div class="container">
                <div class="footer-wrapper">
                    <div class="footer-wrap-version">
                        <span>© 2023 - Cổng thanh toán MoMo</span>
                    </div>

                    <div class="footer-wrap-info">
                        <span>Hỗ trợ khách hàng:</span>
                        <a class="momo-phone-icon" href="tel:1900545441">1900 54 54 41 (1000đ/phút)</a>
                        <a class="momo-mail-icon" href="mailto:hotro@momo.vn">hotro@momo.vn</a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    <script>
        if (window.history.replaceState) {
            window.history.replaceState(null, null, window.location.href);
        }
    </script>
</body>

</html>

<?php 
 unset( $_SESSION['ma_khach_hang']);
 unset($_SESSION['current_order_price'])
?>