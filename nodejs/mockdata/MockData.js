var getBatchSubmit = function (mergedData) {
    var list = [];
    mergedData.forEach(function (item) {
        switch (item.requestUrl) {
            case 'upservices/getHotKeywords':
                list.push({ list: ['果冻', '凤爪', '猪肉脯', '素肉'] });
                break;
            case 'upservices/getCategory':
                list.push({ list: ['坚果炒货', '肉类即食', '果脯蜜饯', '豆菌笋类', '糕点饼干', '糖果果冻', '礼盒礼包\礼品卡', '精包装\进口商品', '刚需/衍生品'] });
                break;
            case 'upservices/getCartAmount':
                list.push({ amount: 10 });
                break;
            case 'upservices/getNotices':
                list.push({ list: ['68元包邮！包邮政策调整公告', '会员活动优惠券使用规则公告', '2015年5月31日物流盘点暂停发货公告', '来伊份手机APP支付宝付款暂停服务公告', '2015年4月30日物流盘点暂停发货公告', '来伊份会员生日红包发放公告', '2015年3月31日物流盘点暂停发货公告'] });
                break;
            case 'upservices/getGoods':
                {
                    var good = { name: '无锡酱排骨260g', price: '￥26.35', src: 'http://images2.laiyifen.com/laiyifen/2012/70824/70824_01_s.jpg?1334644844#h' };
                    var goods = [];
                    for (var i = 0; i < 10; i++) {
                        goods.push(good);
                    }
                    list.push([
                        { header: '干果炒货', list: goods, value: good },
                        { header: '肉制品', position: 'right', list: goods, value: good },
                        { header: '蜜饯干果', list: goods, value: good }
                    ]);
                }
                break;
            case 'upservices/getNavigation':
                list.push({ list: ['首页', '休闲零食', '坚果炒货', '带壳坚果'] });
                break;
            case 'upservices/getGoodsSearch':
                list.push({ list: [{ title: '分类名称', list: [{ title: '山楂类', amount: 50}] }, { title: '品牌', list: [{ title: '休闲零食', amount: 50}]}] });
                break;
            case 'upservices/getSearchResult':
                list.push({ amount: 50 });
                break;
			case 'upservices/getAddress':
                list.push({ list: [
					{title:"北京市",list:['东城区','西城区','崇文区','宣武区','朝阳区','海淀区','丰台区','门头沟区','房山县','大兴县','顷义县','平谷县','密云县','怀柔县','昌平县','延庆县','通县']},
					{title:"天津市",list:['和平区','河北区','河东区','河西区','南开区','红桥区','东丽区','西青区','津南区','北辰区','塘沽区','汉沽区','大港区','蓟县','宝坻县','武清县','静海县','宁河县']},
					{title:"上海市",list:['上海黄浦区','卢湾区','金山区','徐汇区','长宁区','静安区','普陀区','闸北区','虹口区','杨浦区','闵行区','宝山区','嘉定区','浦东新区','松江区','青浦区','南汇区','奉贤区','崇明区']},
					{title:"重庆市",list:['渝中区','大渡口区','江北区','沙坪坝区','九龙坡区','南岸区','北碚区','万盛区','双桥区','渝北区','巴南区','万州区','涪陵区','黔江区','长寿区','江津区','永川区','合川区','南川区','綦江县','潼南县','荣昌县','璧山县','大足县','铜梁县','梁平县','城口县','垫江县','武隆县','丰都县','奉节县','开县','云阳县','忠县','巫溪县','巫山县','石柱土家族自治县','秀山土家族苗族自治县','酉阳土家族苗族自治县','彭水苗族土家族自治县']},
					{title:"辽宁",list:['沈阳市','大连市','鞍山市','抚顺市','本溪市','丹东市','锦州市','葫芦岛市','营口市','盘锦市','阜新市','辽阳市','铁岭市','朝阳市','凌源市','北票市']},
					{title:"吉林",list:['长春市','吉林市','四平市','辽源市','通化市','白山市','延边朝鲜族自治州','白城市','松原市']},
					{title:"黑龙江",list:[]},
					{title:"北京市",list:[]},
					{title:"北京市",list:[]},
					{title:"北京市",list:[]},
					{title:"北京市",list:[]},
					{title:"北京市",list:[]},
					{title:"北京市",list:[]},
					{title:"北京市",list:[]},
				]
				});
                break;
            case 'upservices/getListContent':
                {
                    var good = { name: '无锡酱排骨260g', price: '￥26.35', src: 'http://images2.laiyifen.com/laiyifen/2012/70824/70824_01_s.jpg?1334644844#h' };
                    var goods = [];
                    for (var i = 0; i < 10; i++) {
                        goods.push(good);
                    }
                    list.push({ list: goods });
                }
                break;
        }
    });
    return { code: 200, data: { success: list, fail: null} };
};

if (typeof exports !== "undefined") {
    module.exports = {
        getBatchSubmit: getBatchSubmit
    };
};