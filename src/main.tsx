import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Theme } from '@radix-ui/themes';
import { ToasterProvider } from './components/theme/ToasterProvider';
import { AppRouter } from './router/AppRouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queries';
function App() {
  return (
    <Theme
      appearance="dark"
      accentColor="crimson"
      radius="medium"
      panelBackground="translucent">
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ToasterProvider />
      </QueryClientProvider>
    </Theme>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
