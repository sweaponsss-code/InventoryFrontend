// src/App.jsx (최종 수정)

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import StockUpdateForm from './components/StockUpdateForm';
import TransactionHistoryList from './components/TransactionHistoryList'; // ⭐ 새 컴포넌트 임포트

const API_BASE_URL = 'http://localhost:8080/api/inventory';

function App() {
    const [products, setProducts] = useState([]);
    const [history, setHistory] = useState([]); // ⭐ 기록 상태 추가
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 품목 목록 조회
    const fetchProducts = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/products`);
            setProducts(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("품목 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    }, []);

    // ⭐ 재고 기록 조회
    const fetchHistory = useCallback(async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/history`);
            setHistory(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching history:", err);
            // history 로딩 오류는 치명적이지 않으므로, product error와 분리하여 처리
        }
    }, []);

    useEffect(() => {
        fetchProducts();
        fetchHistory(); // ⭐ 컴포넌트 마운트 시 기록 조회
    }, [fetchProducts, fetchHistory]);

    // 입/출고 성공 시 목록과 기록 모두 새로고침
    const handleUpdateSuccess = () => {
        fetchProducts();
        fetchHistory(); // ⭐ 입출고 후 기록도 새로고침
    };

    return (
        <div className="App">
            
            {/* 폼과 목록을 플렉스로 배치하거나, 순서대로 배치하여 통합 화면 구성 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                
                {/* 1. 입/출고 폼 */}
                <StockUpdateForm onUpdateSuccess={handleUpdateSuccess} /> 
                
                {/* 2. 품목 목록 (카드 뷰) */}
                <ProductList 
                    products={products} 
                    loading={loading} 
                    error={error} 
                />
                
                {/* ⭐ 3. 재고 거래 기록 목록 (새로 추가) */}
                <TransactionHistoryList history={history} />
                
            </div>
        </div>
    );
}

export default App;
