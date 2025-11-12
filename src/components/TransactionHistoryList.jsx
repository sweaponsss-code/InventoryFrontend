// src/components/TransactionHistoryList.jsx

function TransactionHistoryList({ history }) {
    if (!history || history.length === 0) {
        return <div style={{ marginTop: '30px' }}>재고 기록이 없습니다.</div>;
    }

    return (
        <div style={{ marginTop: '50px' }}>
            <h2>📜 최근 재고 거래 기록 (TOP 1000)</h2>
            <table className="history-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>품목 ID</th>
                        <th>유형</th>
                        <th>수량</th>
                        <th>일시</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((record) => (
                        <tr key={record.transactionID}>
                            <td>{record.transactionID}</td>
                            <td>{record.productID}</td>
                            <td style={{ color: record.transactionType === '출고' ? '#dc3545' : '#17a2b8', fontWeight: 'bold' }}>
                                {record.transactionType}
                            </td>
                            <td>{record.quantity}</td>
                            <td>{new Date(record.transactionDate).toLocaleString('ko-KR')}</td> {/* 시간 포맷 */}
                            <td>{record.remarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TransactionHistoryList;
