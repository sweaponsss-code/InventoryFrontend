
function ProductList({ products, loading, error }) {
    
    if (loading) {
        return <div>재고 목록을 불러오는 중입니다...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', fontWeight: 'bold' }}>오류: {error}</div>;
    }

    return (
        <div style={{ marginTop: '40px' }}>
            <h1>📦 품목 재고 현황</h1>
            
            {/* ⭐ 컨테이너: product-grid 클래스를 사용하여 CSS Grid 레이아웃 적용 */}
            <div className="product-grid">
                {products.map((product) => (
                    
                    /* ⭐ 개별 품목: product-card 클래스 적용 */
                    <div key={product.productID} className="product-card">
                        
                        <div className="card-title">
                            {product.productName} (ID: {product.productID})
                        </div>
                        
                        <div className="card-detail">
                            단위: {product.unit}
                        </div>
                        
                        <div className="card-detail card-status">
                            활성화 상태: 
                            {product.isActive 
                                ? <span style={{ color: 'green', marginLeft: '5px' }}>🟢 활성</span> 
                                : <span style={{ color: 'red', marginLeft: '5px' }}>🔴 비활성</span>}
                        </div>
                        
                        {/* 재고 수량 강조 */}
                        <div className="card-stock">
                            현재 재고: {product.currentStock} {product.unit}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
