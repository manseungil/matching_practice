import React, { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]); // 사용자 목록 상태
  const [userName, setUserName] = useState(''); // 사용자 이름 상태
  const [matchedResult, setMatchedResult] = useState(''); // 매칭 결과 상태
  const [showUserList, setShowUserList] = useState(false); // 사용자 목록 보이기/숨기기 상태
  const [isMatched, setIsMatched] = useState(false); // 매칭 완료 상태

  // 사용자 이름 입력 변경 핸들러
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  // 사용자 추가 함수
  const addUser = () => {
    const newUser = {
      id: users.length + 1,
      name: userName
    };
    setUsers([...users, newUser]);
    setUserName(''); // 사용자 이름 입력 필드 초기화
  };

  // 매칭 로직 함수
  const handleMatch = () => {
    if (users.length <= 1) { // 사용자가 1명 이하면 매칭할 수 없음
      alert('매칭할 사용자가 충분하지 않습니다.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * users.length);
    const matchedIndex = Math.floor(Math.random() * users.length);
    const matchedUserName = users[matchedIndex].name; // 매칭된 상대의 이름
    const result = `${users[randomIndex].name}와 ${matchedUserName}이 매칭되었습니다.`;
    setMatchedResult(result); // 매칭된 결과 설정
    setIsMatched(true); // 매칭 완료 상태 업데이트
  };

  // 수락하기 함수
  const handleAccept = () => {
    // 여기에 수락하기 로직을 추가하세요
  };

  // 거절하기 함수
  const handleReject = () => {
    // 여기에 거절하기 로직을 추가하세요
  };

  // 사용자 삭제 함수
  const deleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>매칭 앱</h1>
        <div className="user-input-container">
          <input 
            type="text" 
            value={userName} 
            onChange={handleUserNameChange} 
            placeholder="사용자 이름을 입력하세요" 
          />
          <button onClick={addUser}>사용자 추가</button>
          <button className="user-list-button" onClick={() => setShowUserList(!showUserList)}>사용자 목록 {showUserList ? '숨기기' : '보기'}</button>
        </div>
        <button className="match-button" onClick={handleMatch}>매칭하기</button>
        {isMatched && (
          <p>매칭 완료!</p>
        )}
        {matchedResult && (
          <>
            <p>{matchedResult}</p>
            <button onClick={handleAccept}>수락하기</button>
            <button onClick={handleReject}>거절하기</button>
          </>
        )}
        {showUserList && (
          <div className="user-list">
            <h2>사용자 목록</h2>
            <ul>
              {users.map(user => (
                <li key={user.id}>
                  {user.name}
                  <button onClick={() => deleteUser(user.id)}>삭제</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
