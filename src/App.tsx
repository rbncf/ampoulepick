/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import CustomBrand from './components/CustomBrand';
import Price from './components/Price';
import Sample from './components/Sample';
import Process from './components/Process';
import About from './components/About';
import Inquiry from './components/Inquiry';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen font-sans text-gray-900 bg-white selection:bg-blue-100">
      <Header />
      <main>
        <Hero />
        <Products />
        <CustomBrand />
        <Price />
        <Sample />
        <Process />
        <About />
        <Inquiry />
      </main>
      <Footer />
    </div>
  );
}
