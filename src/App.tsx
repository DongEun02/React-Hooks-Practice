import { PreservedCallbackRepro } from './PreservedCallbackRepro'
import './App.css'

function App() {
  return (
    <main>
      <h1>usePreservedCallback 재현</h1>
      <p>개발자 도구 콘솔을 열고 입력창의 <code>abcd</code> 뒤에 <code>e</code>를 입력하세요.</p>
      <PreservedCallbackRepro />
      <p>두 번째 <code>onChange</code> 로그의 <code>previousValue</code>와 화면 값을 확인하세요.</p>
    </main>
  )
}

export default App
