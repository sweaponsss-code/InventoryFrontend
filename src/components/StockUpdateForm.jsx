import axios from 'axios';
import { useState } from 'react';

// POST API URL 정의
const API_URL = "http://localhost:8080/api/inventory/update";

function StockUpdateForm({ onUpdateSuccess }) {
    // 폼 입력 상태 관리
    const [formData, setFormData] = useState({
        productID: '',
        quantity: '',
        remarks: '',
        transactionType: '출고' // 기본값을 '출고'로 설정
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // 입력 필드 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'productID' || name === 'quantity' ? Number(value) : value
        }));
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('처리 중...'); // 메시지 초기화
        setIsError(false);

        // ⭐ 클라이언트 단 유효성 검사 추가
        if (!formData.productID || parseInt(formData.productID) <= 0) {
            setMessage('❌ 품목 ID는 필수이며 1 이상의 값이어야 합니다.');
            setIsError(true);
            return; // API 호출 방지
        }
        if (!formData.quantity || parseInt(formData.quantity) <= 0) {
            setMessage('❌ 수량은 필수이며 1 이상의 값이어야 합니다.');
            setIsError(true);
            return; // API 호출 방지
        }

        try {
            // ⭐ POST 요청 전송
            const response = await axios.post(API_URL, formData);
            
            // 성공 응답 처리 (200 OK)
            setMessage(`[${formData.transactionType}] ${response.data}`);
            setIsError(false);
            
            // 폼 초기화 및 부모 컴포넌트(ProductList)에게 데이터 갱신 요청
            setFormData({ productID: '', quantity: '', remarks: '', transactionType: '출고' });
            if (onUpdateSuccess) {
                onUpdateSuccess();
            }

        } catch (error) {
            // 오류 응답 처리 (400 Bad Request, 500 Internal Server Error 등)
            const errorMessage = error.response?.data || "서버 요청 중 알 수 없는 오류 발생";
            setMessage(`[오류] ${errorMessage}`);
            setIsError(true);
        }
    };

    return (
        <div className="form-container"> {/* ⭐ 클래스 적용 */}
            <h2>🛒 재고 입/출고 처리</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group"> {/* ⭐ 클래스 적용 */}
                    <label>품목 ID:</label>
                    <input 
                        type="number" 
                        name="productID" 
                        value={formData.productID} 
                        onChange={handleChange} 
                        required 
                        placeholder="품목 ID 입력" 
                        min="1001" 
                    />
                </div>
                <div className="form-group">
                    <label>수량:</label>
                    <input 
                        type="number" 
                        name="quantity" 
                        value={formData.quantity} 
                        onChange={handleChange} 
                        required 
                        min="1" 
                    />
                </div>
                <div className="form-group">
                    <label>처리 유형:</label>
                    <select name="transactionType" value={formData.transactionType} onChange={handleChange} required>
                        <option value="입고">입고 (재고 증가)</option>
                        <option value="출고">출고 (재고 감소)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>비고:</label>
                    <input 
                        type="text" 
                        name="remarks" 
                        value={formData.remarks} 
                        onChange={handleChange} 
                    />
                </div>
                <button type="submit" className="submit-button">처리</button> {/* ⭐ 클래스 적용 */}
            </form>

            {/* 메시지 스타일 적용 */}
            {message && (
                <div 
                    style={{ 
                        marginTop: '15px', 
                        padding: '10px', 
                        borderRadius: '4px',
                        backgroundColor: isError ? '#ffe0e0' : '#e0ffe0',
                        color: isError ? '#cc0000' : '#009900',
                        fontWeight: 'bold'
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    );
}

export default StockUpdateForm;
