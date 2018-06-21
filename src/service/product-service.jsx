import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class Product {

    getProductList(listParam) {

        let url = '', data = {};

        if(listParam.listType === 'list') {
            url = '/manage/product/list.do';
            data.pageNum = listParam.pageNum;
        } else if(listParam.listType === 'search') {
            url = '/manage/product/search.do';
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.keyword;
        }

        return _mm.request({
            type: 'post',
            url: url,
            data: data
        });
    }

    setProductStatus(productInfo) {
        return _mm.request({
            type: 'post', 
            url: '/manage/product/set_sale_status.do',
            data: productInfo
        });
    }
}

export default Product;