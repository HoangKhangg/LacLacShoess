function showCommonModal(o,a,n,d,e){var l=$("<div class='modal-buttons-container'></div>");null!=e?l.append($("<a class='text-gray-dark hover-black font-weight-bold-600 mx-3 hover-none-decoration' style='cursor: pointer' onclick='return closeCommonModal()'>"+e+"</a>")).append($("<a class='momo-color font-weight-bold-600 hover-momo-color mx-3 hover-none-decoration' style='cursor: pointer' onclick='"+d+"'>"+n+"</a>")):null==d?l.append($("<a class='momo-color font-weight-bold-600 mx-3 hover-none-decoration' onclick='return closeCommonModal()'>"+n+"</a>")):l.append($("<a class='momo-color font-weight-bold-600 mx-3 hover-none-decoration' onclick='"+d+"'>"+n+"</a>"));var c=$("<div class='modal-body'></div>");c.append($("<img class='button-modal-close hover-none-decoration' src='/v2/gateway/images/navigation-close-circle.svg' onClick='return closeCommonModal()'/>")).append($("<h5 class='modal-popup-title'>"+o+"</h5>")).append($("<div>"+a+"</div>")).append(l);var i=$("<div class='modal-content'></div>");i.append(c);var t=$("<div class='popup-modal-dialog modal-dialog-centered'></div>");t.append(i);var p=$("<div class='popup-modal-background common-modal'></div>");p.append(t),$("#contents").append(p)}function showCommonModal(o,a,n,d,e,l){var c=$("<div class='modal-buttons-container'></div>");null!=e?c.append($("<a class='text-gray-dark hover-black font-weight-bold-600 mx-3 hover-none-decoration' style='cursor: pointer' onclick='"+l+"'>"+e+"</a>")).append($("<a class='momo-color font-weight-bold-600 hover-momo-color mx-3 hover-none-decoration' style='cursor: pointer' onclick='"+d+"'>"+n+"</a>")):c.append($("<a class='momo-color font-weight-bold-600 mx-3 hover-none-decoration' onclick='"+d+"'>"+n+"</a>"));var i=$("<div class='modal-body'></div>");i.append($("<img class='button-modal-close hover-none-decoration' src='/v2/gateway/images/navigation-close-circle.svg' onClick='return closeCommonModal()'/>")).append($("<h5 class='modal-popup-title'>"+o+"</h5>")).append($("<div>"+a+"</div>")).append(c);var t=$("<div class='modal-content'></div>");t.append(i);var p=$("<div class='popup-modal-dialog modal-dialog-centered'></div>");p.append(t);var s=$("<div class='popup-modal-background common-modal'></div>");s.append(p),$("#contents").append(s)}function closeCommonModal(){$(".common-modal").remove()}function showModalWithCustomButton(o,a,n){var d=$("<div class='modal-buttons-container'></div>");d.append(n);var e=$("<div class='modal-body'></div>");e.append($("<img class='button-modal-close hover-none-decoration' src='/v2/gateway/images/navigation-close-circle.svg' onClick='return closeCommonModal()'/>")).append($("<h5 class='modal-popup-title'>"+o+"</h5>")).append($("<div>"+a+"</div>")).append(d);var l=$("<div class='modal-content'></div>");l.append(e);var c=$("<div class='popup-modal-dialog modal-dialog-centered'></div>");c.append(l);var i=$("<div class='popup-modal-background common-modal'></div>");i.append(c),$("#contents").append(i)}function createTooltip(o,a,n){var d=$(a);console.log(o),o.tooltip({html:!0,title:d,offset:n})}