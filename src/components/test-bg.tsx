export function TestBackground() {
  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      backgroundColor: 'rgba(255, 0, 0, 0.2)'
    }}>
      {/* Test Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url(/backgrounds/polny_poryadok_background.png) no-repeat center center',
        backgroundSize: 'cover',
        opacity: 0.8,
        zIndex: 1
      }}></div>
      
      {/* Test Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '2rem',
        color: 'white',
        textAlign: 'center',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Тестовый заголовок
        </h1>
        <p>Если вы видите это сообщение, но не видите фоновое изображение,<br/>пожалуйста, проверьте консоль браузера (F12) на наличие ошибок</p>
      </div>
    </div>
  );
}
