import React from 'react';
import FormInput from './components/FormInput';
import List from './components/List';
// import Footer from './components/Footer';
import { DataProvider } from './components/DataProvider';
import './App.css';

export default function App() {
  return (
    <DataProvider>
      <div className="header">
        <FormInput />
      </div>

      <List />
    </DataProvider>
  );
}
