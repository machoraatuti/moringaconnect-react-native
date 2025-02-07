import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WebView from 'react-native-webview';

const colors = {
  primary: '#0A1F44',
  secondary: '#F05A28',
  white: '#FFFFFF',
};

const socialLinks = [
  { icon: 'facebook', url: 'https://www.facebook.com/moringaschool/' },
  { icon: 'linkedin', url: 'https://www.linkedin.com/company/moringa-school' },
  { icon: 'twitter', url: 'https://twitter.com/moringaschool' },
  { icon: 'youtube', url: 'https://www.youtube.com/MoringaSchoolVideos/videos' }
];

const Footer = () => {
  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  const mapHtml = `
    <iframe 
      src="https://maps.google.com/maps?q=Moringa%20School,%20Ngong%20Lane,%20Nairobi&t=&z=13&ie=UTF8&iwloc=&output=embed"
      width="100%"
      height="100%"
      style="border: 0"
      allowfullscreen=""
    ></iframe>
  `;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* Logo and Social Media */}
          <View style={styles.section}>
            <Text style={styles.logo}>MORINGA</Text>
            <Text style={styles.tagline}>Discover · Grow · Transform</Text>
            <View style={styles.socialLinks}>
              {socialLinks.map((link, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleLinkPress(link.url)}
                  style={styles.socialButton}
                >
                  <Icon name={link.icon} size={24} color={colors.white} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Contact Information */}
          <View style={styles.section}>
            <Text style={styles.text}>
              Ngong Lane, Ngong Lane Plaza, 1st Floor, Nairobi, Kenya
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Phone:</Text> +254711 082 146
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>WhatsApp:</Text> +254712 293 878
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Corporate Inquiries:</Text> 0738 368 319
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Email:</Text> contact@moringaschool.com
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Admissions:</Text> admissions@moringaschool.com
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>P.O. Box:</Text> 28860 – 00100, Nairobi
            </Text>
          </View>

          {/* Map */}
          <View style={styles.mapContainer}>
            <WebView
              source={{ html: mapHtml }}
              style={styles.map}
            />
            <TouchableOpacity
              onPress={() => handleLinkPress('https://maps.app.goo.gl/azKbTutxgoYuxWhS8')}
              style={styles.mapLink}
            >
              <Text style={styles.mapLinkText}>View on Google Maps</Text>
            </TouchableOpacity>
          </View>

          {/* Copyright */}
          <View style={styles.copyright}>
            <Text style={styles.copyrightText}>
              © 2025 Moringa School. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  tagline: {
    color: colors.white,
    marginBottom: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    padding: 8,
  },
  text: {
    color: colors.white,
    marginBottom: 8,
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  mapLink: {
    alignItems: 'center',
    padding: 8,
  },
  mapLinkText: {
    color: colors.secondary,
  },
  copyright: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
    paddingTop: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  copyrightText: {
    color: colors.white,
    fontSize: 12,
  },
});

export default Footer;