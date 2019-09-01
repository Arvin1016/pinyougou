//购物车控制层
app.controller('cartController', function ($scope, cartService) {
    $scope.findCartList = function () {
        cartService.findCartList().success(
            function (response) {
                $scope.cartList = response;
                //求合计数
                $scope.totalValue = cartService.sum($scope.cartList);
            }
        )
    };

    //添加商品到购物车
    $scope.addGoodsToCartList = function (itemId, num) {

        cartService.addGoodsToCartList(itemId, num).success(
            function (response) {
                if (response.success) {
                    $scope.findCartList();//刷新列表
                } else {
                    alert(response.message);//弹出错误提示
                }
            }
        );
    };

    //查询当前登录人的地址列表
    $scope.findAddressList = function () {
        cartService.findAddressList().success(
            function (response) {
                $scope.addressList = response;
                //设置默认地址
                for (var i = 0; i < $scope.addressList.length; i++) {
                    if ($scope.addressList[i].isDefault == '1') {
                        $scope.address = $scope.addressList[1];
                        break;
                    }
                }
            }
        );
    };

    //选择地址
    $scope.selectAddress = function (address) {
        $scope.address = address;
    };

    //判断是否是当前选择的地址
    $scope.isSelectAddress = function (address) {
        if ($scope.address == address) {
            return true;
        } else {
            return false;
        }
    };

    //支付方式
    $scope.order = {paymentType: '1'};

    $scope.selectPayType = function (type) {
        $scope.order.paymentType = type
    };

    //保存订单
    $scope.submitOrder = function () {
        $scope.order.receiverAreaName = $scope.address.address; //地址
        $scope.order.receiverMobile = $scope.address.mobile; //手机号
        $scope.order.receiver = $scope.address.contact; //联系人
        cartService.submitOrder($scope.order).success(
            function (response) {
                if (response.success) {
                    if ($scope.order.paymentType == "1") { //如果是微信支付,跳转到微信支付页面
                        location.href = "pay.html";
                    } else { //如果货到付款,跳转到提示页面
                        location.href = "paysuccess.html";
                    }
                } else {
                    alert(response.message); //跳转到提示页面
                }
            }
        );
    }
});