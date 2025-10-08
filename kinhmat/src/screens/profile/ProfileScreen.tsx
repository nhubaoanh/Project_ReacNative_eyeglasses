import { Colors } from "@/constants/colors";
import { Sizes } from "@/constants/sizes";
import React, { useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button } from '../../components/ui/Button';
import { userStorage } from "@/src/utils/userStorage";
import { useRouter } from "expo-router";

interface ProfileScreenProps {
  onBack: () => void;
  onEditProfile: () => void;
  onSettings: () => void;
  onHelp: () => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onBack,
  onEditProfile,
  onSettings,
  onHelp,
  onLogout,
}) => {

  const router = useRouter();
  // Mock user data
  const [user] = useState({
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    avatar: 'https://via.placeholder.com/100x100/007AFF/FFFFFF?text=User',
    memberSince: '2023',
    totalOrders: 15,
    totalSpent: 150000000,
    loyaltyPoints: 2500,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleLogout = async () => {
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          const currentUser = await userStorage.getCurrentUser();
          if (currentUser) {
            await userStorage.logout();
            console.log("Đăng xuất thanh cong");
          }
          router.replace("/login");
        },
      },
    ]);
  };


  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Hồ sơ</Text>
      <TouchableOpacity style={styles.settingsButton} onPress={onSettings}>
        <Text style={styles.settingsIcon}>⚙️</Text>
      </TouchableOpacity>
    </View>
  );

  const renderUserInfo = () => (
    <View style={styles.userInfoSection}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.editAvatarButton}>
          <Text style={styles.editAvatarIcon}>📷</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userEmail}>{user.email}</Text>
      <Text style={styles.userPhone}>{user.phone}</Text>
      
      <Button
        title="Chỉnh sửa hồ sơ"
        onPress={onEditProfile}
        variant="outline"
        size="medium"
        style={styles.editProfileButton}
      />
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsSection}>
      <Text style={styles.sectionTitle}>Thống kê mua sắm</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user.totalOrders}</Text>
          <Text style={styles.statLabel}>Đơn hàng</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{formatPrice(user.totalSpent)}</Text>
          <Text style={styles.statLabel}>Tổng chi tiêu</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user.loyaltyPoints}</Text>
          <Text style={styles.statLabel}>Điểm tích lũy</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{user.memberSince}</Text>
          <Text style={styles.statLabel}>Năm tham gia</Text>
        </View>
      </View>
    </View>
  );

  const renderMenuItems = () => (
    <View style={styles.menuSection}>
      <Text style={styles.sectionTitle}>Tùy chọn</Text>
      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Text style={styles.menuIcon}>📋</Text>
          <Text style={styles.menuTitle}>Đơn hàng của tôi</Text>
        </View>
        <Text style={styles.menuArrow}>→</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Text style={styles.menuIcon}>❤️</Text>
          <Text style={styles.menuTitle}>Sản phẩm yêu thích</Text>
        </View>
        <Text style={styles.menuArrow}>→</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Text style={styles.menuIcon}>📍</Text>
          <Text style={styles.menuTitle}>Địa chỉ giao hàng</Text>
        </View>
        <Text style={styles.menuArrow}>→</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Text style={styles.menuIcon}>💳</Text>
          <Text style={styles.menuTitle}>Phương thức thanh toán</Text>
        </View>
        <Text style={styles.menuArrow}>→</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Text style={styles.menuIcon}>🎁</Text>
          <Text style={styles.menuTitle}>Mã giảm giá</Text>
        </View>
        <Text style={styles.menuArrow}>→</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Text style={styles.menuIcon}>🔔</Text>
          <Text style={styles.menuTitle}>Thông báo</Text>
        </View>
        <Text style={styles.menuArrow}>→</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSupportSection = () => (
    <View style={styles.supportSection}>
      <Text style={styles.sectionTitle}>Hỗ trợ</Text>
      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Text style={styles.menuIcon}>❓</Text>
          <Text style={styles.menuTitle}>Trung tâm trợ giúp</Text>
        </View>
        <Text style={styles.menuArrow}>→</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Text style={styles.menuIcon}>📞</Text>
          <Text style={styles.menuTitle}>Liên hệ hỗ trợ</Text>
        </View>
        <Text style={styles.menuArrow}>→</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Text style={styles.menuIcon}>⭐</Text>
          <Text style={styles.menuTitle}>Đánh giá ứng dụng</Text>
        </View>
        <Text style={styles.menuArrow}>→</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLogoutSection = () => (
    <View style={styles.logoutSection}>
      <Button
        title="Đăng xuất"
        onPress={handleLogout}
        variant="danger"
        size="large"
        fullWidth
        style={styles.logoutButton}
      />
      
      <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderUserInfo()}
        {renderStats()}
        {renderMenuItems()}
        {renderSupportSection()}
        {renderLogoutSection()}
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.screenPadding,
    paddingVertical: Sizes.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  
  backButton: {
    padding: Sizes.sm,
  },
  
  backIcon: {
    fontSize: Sizes.iconLg,
    color: Colors.textPrimary,
  },
  
  headerTitle: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  
  settingsButton: {
    padding: Sizes.sm,
  },
  
  settingsIcon: {
    fontSize: Sizes.iconLg,
  },
  
  userInfoSection: {
    alignItems: 'center',
    padding: Sizes.screenPadding,
    backgroundColor: Colors.surface,
    marginBottom: Sizes.md,
  },
  
  avatarContainer: {
    position: 'relative',
    marginBottom: Sizes.md,
  },
  
  avatar: {
    width: 100,
    height: 100,
    borderRadius: Sizes.radiusRound,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: Sizes.radiusRound,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  
  editAvatarIcon: {
    fontSize: Sizes.fontSizeSm,
  },
  
  userName: {
    fontSize: Sizes.fontSizeXl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Sizes.xs,
    textAlign: 'center',
  },
  
  userEmail: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
    marginBottom: Sizes.xs,
    textAlign: 'center',
  },
  
  userPhone: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
    marginBottom: Sizes.md,
    textAlign: 'center',
  },
  
  editProfileButton: {
    marginBottom: Sizes.sm,
  },
  
  statsSection: {
    padding: Sizes.screenPadding,
    backgroundColor: Colors.surface,
    marginBottom: Sizes.md,
  },
  
  sectionTitle: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Sizes.md,
  },
  
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  
  statCard: {
    width: '48%',
    backgroundColor: Colors.grayLight,
    borderRadius: Sizes.radiusMd,
    padding: Sizes.md,
    marginBottom: Sizes.sm,
    alignItems: 'center',
  },
  
  statNumber: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Sizes.xs,
  },
  
  statLabel: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  
  menuSection: {
    padding: Sizes.screenPadding,
    backgroundColor: Colors.surface,
    marginBottom: Sizes.md,
  },
  
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Sizes.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  menuIcon: {
    fontSize: Sizes.iconMd,
    marginRight: Sizes.md,
  },
  
  menuTitle: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  
  menuArrow: {
    fontSize: Sizes.fontSizeLg,
    color: Colors.textSecondary,
  },
  
  supportSection: {
    padding: Sizes.screenPadding,
    backgroundColor: Colors.surface,
    marginBottom: Sizes.md,
  },
  
  logoutSection: {
    padding: Sizes.screenPadding,
    backgroundColor: Colors.surface,
    marginBottom: Sizes.md,
  },
  
  logoutButton: {
    marginBottom: Sizes.md,
  },
  
  versionText: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  
  bottomSpacing: {
    height: Sizes.xxl,
  },
});
