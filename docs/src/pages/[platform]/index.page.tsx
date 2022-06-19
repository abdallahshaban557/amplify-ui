import * as React from 'react';

import { Footer } from '@/components/Layout/Footer';
import { useCustomRouter } from '@/components/useCustomRouter';
import { HeroSection } from '@/components/home/sections';
import ReactHomePage from './index.react';
import VueHomePage from './index.vue';
import AngularHomePage from './index.angular';
import FlutterHomePage from './index.flutter';
import { debounce } from 'lodash';

const HomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  const handleScroll = debounce((e) => {
    const bodyScroll = e.target.documentElement.scrollTop;
    if (bodyScroll > 50) {
      document.body.classList.add('scrolled');
    } else if (document.body.classList.contains('scrolled')) {
      document.body.classList.remove('scrolled');
    }
  });

  React.useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  let pageContent;

  switch (platform) {
    case 'react':
      pageContent = <ReactHomePage colorMode={colorMode} />;
      break;
    case 'vue':
      pageContent = <VueHomePage colorMode={colorMode} />;
      break;
    case 'angular':
      pageContent = <AngularHomePage colorMode={colorMode} />;
      break;
    case 'flutter':
      pageContent = <FlutterHomePage colorMode={colorMode} />;
      break;
    default:
      pageContent = <ReactHomePage colorMode={colorMode} />;
      break;
  }

  return (
    <>
      {/* Hero/intro */}
      <HeroSection />

      {/* Framework content */}
      {pageContent}

      {/* Shared content */}
      <Footer />
    </>
  );
};

export default HomePage;
