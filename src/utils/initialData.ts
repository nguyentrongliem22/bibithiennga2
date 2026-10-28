import { KindergartenState } from '../types';

export const INITIAL_KINDERGARTEN_DATA: KindergartenState = {
  schoolInfo: {
    name: "Trường Mầm non BiBi Thiên Nga Steam Preschool",
    slogan: "Ươm mầm sáng tạo · Nuôi dưỡng trái tim hạnh phúc cùng phương pháp STEAM hiện đại",
    shortIntro: "Trường mầm non tư thục chất lượng cao tại Cẩm Lệ, Đà Nẵng. Áp dụng phương pháp STEAM tích hợp, không gian xanh mát và chế độ chăm sóc tận tâm cho trẻ từ 6 tháng đến 5 tuổi.",
    fullIntro: "Trường Mầm non BiBi Thiên Nga Steam Preschool (thuộc quận Cẩm Lệ, TP. Đà Nẵng) là trường mầm non tư thục tiên phong áp dụng phương pháp giáo dục hiện đại. Với phương châm lấy trẻ làm trung tâm, BiBi Thiên Nga tạo nên môi trường an toàn, ngập tràn tình yêu thương, kết hợp phương pháp giáo dục STEAM (Science - Khoa học, Technology - Công nghệ, Engineering - Kỹ thuật, Art - Nghệ thuật, Math - Toán học) giúp các bé phát triển toàn diện cả về thể chất, trí tuệ, cảm xúc và kỹ năng xã hội.",
    address: "37 Phan Văn Trị",
    ward: "Phường Khuê Trung",
    district: "Quận Cẩm Lệ",
    city: "TP. Đà Nẵng",
    hotline: "0707.609.131",
    email: "bibithiennga.preschool@gmail.com",
    ageRange: "Từ 6 tháng đến 5 tuổi",
    scheduleHours: "6:30 – 18:00",
    scheduleDays: "Thứ Hai đến thứ Bảy",
    closedDays: "Chủ Nhật nghỉ",
    emergencyNotice: "🎉 Đang mở đợt tuyển sinh năm học mới: Ưu đãi 15% học phí cho 20 bé đầu tiên đăng ký trong tháng!",
    isEmergencyNoticeActive: true,
    facebookUrl: "https://facebook.com/bibithienngasteampreschool",
    zaloUrl: "https://zalo.me/0707609131",
    youtubeUrl: "https://youtube.com",
  },

  classes: [
    {
      id: "class-1",
      name: "Lớp Nhà Trẻ Bé (Baby Swan)",
      ageGroup: "6 - 18 tháng tuổi",
      capacity: 12,
      enrolledCount: 9,
      feePerMonth: 3800000,
      steamFocus: "Kích thích đa giác quan & Vận động sơ khai",
      description: "Chế độ chăm sóc 1:3 chuyên biệt, không gian vô trùng, sàn gỗ tự nhiên ấm áp, thực đơn dặm kiểu Nhật và BLW khoa học.",
      features: [
        "Tỷ lệ cô/trẻ chuẩn 1:3",
        "Kích thích thị giác & thính giác đa giác quan",
        "Phòng ngủ riêng yên tĩnh, kiểm soát nhiệt độ",
        "Báo cáo sinh hoạt chi tiết theo ngày cho ba mẹ"
      ],
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      teacherLead: "Cô Nguyễn Thị Mai Trang"
    },
    {
      id: "class-2",
      name: "Lớp Nhà Trẻ Lớn (Little Explorers)",
      ageGroup: "18 - 36 tháng tuổi",
      capacity: 16,
      enrolledCount: 14,
      feePerMonth: 3600000,
      steamFocus: "Khám phá thế giới quanh ta & Rèn luyện kỹ năng tự lập",
      description: "Tập trung phát triển ngôn ngữ, vận động thô và vận động tinh, rèn thói quen tự xúc ăn, tự mặc áo và đi vệ sinh.",
      features: [
        "Làm quen với cảm thụ âm nhạc & chuyển động nhịp nhàng",
        "Rèn kỹ năng tự phục vụ cơ bản",
        "Tiếng Anh tương tác qua bài hát và trò chơi",
        "Giờ chơi cát nước rèn cảm giác tiếp xúc"
      ],
      imageUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80",
      teacherLead: "Cô Lê Thị Hồng Hạnh"
    },
    {
      id: "class-3",
      name: "Lớp Mầm STEAM (Creative Makers)",
      ageGroup: "3 - 4 tuổi",
      capacity: 20,
      enrolledCount: 18,
      feePerMonth: 3500000,
      steamFocus: "Khoa học diệu kỳ & Sáng tạo nghệ thuật",
      description: "Bé tham gia các dự án khám phá thực vật, màu sắc, thời tiết; phát triển tư duy tạo hình và ngôn ngữ diễn đạt lưu loát.",
      features: [
        "Thí nghiệm khoa học vui 2 buổi/tuần",
        "Xưởng sáng tạo nghệ thuật tái chế",
        "Tiếng Anh giáo viên bản ngữ kết hợp giáo viên Việt Nam",
        "Tập yoga nhí và rèn luyện thể chất dẻo dai"
      ],
      imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
      teacherLead: "Cô Phan Trần Như Quỳnh"
    },
    {
      id: "class-4",
      name: "Lớp Chồi STEAM (Young Engineers)",
      ageGroup: "4 - 5 tuổi",
      capacity: 20,
      enrolledCount: 17,
      feePerMonth: 3500000,
      steamFocus: "Kỹ thuật lắp ráp Lego STEAM & Tư duy logic toán học",
      description: "Bé học cách đặt câu hỏi 'Tại sao?', giải quyết vấn đề qua các mô hình lắp ráp, đo lường và làm việc nhóm.",
      features: [
        "Bộ học cụ STEAM Lego Education",
        "Toán tư duy Finger Math & Soroban nhập môn",
        "Kỹ năng thuyết trình trước tập thể",
        "Dã ngoại trải nghiệm nông trại sinh thái hàng tháng"
      ],
      imageUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80",
      teacherLead: "Cô Đặng Hoàng Yến"
    },
    {
      id: "class-5",
      name: "Lớp Lá STEAM Tiền Tiểu Học (Future Leaders)",
      ageGroup: "5 - 6 tuổi",
      capacity: 22,
      enrolledCount: 20,
      feePerMonth: 3700000,
      steamFocus: "Chuẩn bị tâm thế vững vàng vào Lớp 1 & Lập trình tư duy",
      description: "Trang bị tâm lý, kỹ năng tập trung, tư thế ngồi viết chuẩn, nhận diện chữ cái, toán logic và sự tự tin phản biện.",
      features: [
        "Hành trang vào lớp 1 toàn diện (không gây áp lực)",
        "Lập trình tư duy qua robot mầm non thông minh",
        "Tiếng Anh giao tiếp phản xạ tự nhiên chuẩn Cambridge",
        "Kỹ năng xử lý tình huống và bảo vệ bản thân"
      ],
      imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
      teacherLead: "Thầy Nguyễn Hữu Thành"
    }
  ],

  menu: [
    {
      id: "menu-mon",
      dayOfWeek: "Thứ Hai",
      breakfast: "Phở bò hầm rau củ quả tươi",
      morningSnack: "Sữa hạt sen macca béo ngậy",
      lunch: "Cơm tám thơm · Tôm rim thịt nạc thăn · Canh cua đồng mồng tơi · Tráng miệng: Chuối tiêu chín cây",
      afternoonSnack: "Súp gà ngô non nấm hương",
      eveningMeal: "Sữa chua uống men sống Probi & Bánh quy yến mạch",
      calories: "1150 - 1250 kcal",
      allergensNote: "Có tôm biển (lớp nhà trẻ dùng thịt heo nạc xay)"
    },
    {
      id: "menu-tue",
      dayOfWeek: "Thứ Ba",
      breakfast: "Cháo lươn đồng xào nghệ thanh mát",
      morningSnack: "Nước ép cam sành tươi nguyên chất",
      lunch: "Cơm dẻo · Cá hồi áp chảo sốt bơ tỏi · Canh sườn hầm bí đỏ hạt sen · Tráng miệng: Dưa hấu ngọt mát",
      afternoonSnack: "Chè đậu xanh hạt sen nước cốt dừa",
      eveningMeal: "Sữa tươi tiệt trùng Vinamilk 100% organic",
      calories: "1200 - 1300 kcal",
      allergensNote: "Cá hồi phi lê đã lọc sạch xương kỹ lưỡng"
    },
    {
      id: "menu-wed",
      dayOfWeek: "Thứ Tư",
      breakfast: "Hủ tiếu sườn non thịt bằm Nam Vang",
      morningSnack: "Sinh tố xoài cát chuốt mật ong hoa nhãn",
      lunch: "Cơm hạt sen · Thịt bò xào củ cải đỏ & đậu cô ve · Canh ngao nấu chua thì là · Tráng miệng: Thanh long ruột đỏ",
      afternoonSnack: "Bánh bông lan trứng muối mềm xốp tự nướng",
      eveningMeal: "Sữa hạt óc chó hạnh nhân cao cấp",
      calories: "1180 - 1280 kcal",
      allergensNote: "Ngao biển hấp chín lọc nước trong, không cay"
    },
    {
      id: "menu-thu",
      dayOfWeek: "Thứ Năm",
      breakfast: "Bánh cuốn chả lụa nóng hổi rưới mỡ hành",
      morningSnack: "Nước ép ổi lê giàu vitamin C",
      lunch: "Cơm gạo lứt hữu cơ · Gà hấp lá chanh non · Canh cải ngọt nấu tôm sú · Tráng miệng: Đu đủ ruột vàng",
      afternoonSnack: "Cháo sườn non rau củ thập cẩm",
      eveningMeal: "Sữa bột công thức pha chuẩn nhiệt độ",
      calories: "1220 - 1320 kcal",
      allergensNote: "Thịt gà đã bỏ da đối với trẻ có cơ địa dị ứng"
    },
    {
      id: "menu-fri",
      dayOfWeek: "Thứ Sáu",
      breakfast: "Mì Ý spaghetti sốt bò băm phô mai Parmesan",
      morningSnack: "Sữa đậu nành mè đen thơm dịu",
      lunch: "Cơm chiên hoàng bào dương châu · Thịt viên sốt cà chua bi · Canh rong biển đậu phụ non · Tráng miệng: Táo gala nhập khẩu",
      afternoonSnack: "Caramen pudding sữa trứng vani",
      eveningMeal: "Bánh quy dinh dưỡng ngũ cốc & Sữa ấm",
      calories: "1250 - 1350 kcal",
      allergensNote: "Chứa phô mai và trứng gà tiệt trùng"
    },
    {
      id: "menu-sat",
      dayOfWeek: "Thứ Bảy",
      breakfast: "Cháo cá chép đậu xanh hạt sen thơm bùi",
      morningSnack: "Nước ép dưa hấu bạc hà thanh nhiệt",
      lunch: "Cơm dẻo · Trứng cuộn ngũ sắc rau củ · Canh bầu nấu tôm khô thơm lừng · Tráng miệng: Nho xanh không hạt",
      afternoonSnack: "Bánh mì sandwich kẹp phô mai nướng giòn",
      eveningMeal: "Sữa chua men sống hoa quả tươi",
      calories: "1150 - 1250 kcal",
      allergensNote: "Thực đơn ngày thứ 7 nhẹ nhàng, dễ tiêu hóa"
    }
  ],

  teachers: [
    {
      id: "t-1",
      name: "ThS. Phan Thị Thu Hương",
      role: "Hiệu trưởng kiêm Cố vấn Chuyên môn STEAM",
      qualification: "Thạc sĩ Giáo dục Mầm non - ĐH Sư phạm Đà Nẵng",
      experienceYears: 14,
      bio: "Hơn 14 năm tâm huyết với giáo dục sớm, chuyên gia đào tạo phương pháp giáo dục STEAM mầm non và tâm lý trẻ nhỏ.",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      steamCert: "Chứng chỉ Master STEAM Trainer - Hoa Kỳ",
      assignedClass: "Ban Giám Hiệu & Phụ trách Chương trình"
    },
    {
      id: "t-2",
      name: "Cô Nguyễn Thị Mai Trang",
      role: "Khối trưởng Khối Nhà Trẻ (6-24 tháng)",
      qualification: "Cử nhân Sư phạm Mầm non - ĐH Sư phạm Huế",
      experienceYears: 8,
      bio: "Dịu dàng, chu đáo, có chứng chỉ sơ cấp cứu nhi khoa quốc tế và thâm niên chăm sóc các bé sơ sinh tập đi.",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
      steamCert: "Chứng chỉ Giáo dục Sớm Montessori 0-3",
      assignedClass: "Lớp Nhà Trẻ Bé (Baby Swan)"
    },
    {
      id: "t-3",
      name: "Cô Lê Thị Hồng Hạnh",
      role: "Giáo viên Chủ nhiệm Khối Nhà Trẻ Lớn",
      qualification: "Cử nhân GD Mầm non - ĐH Sư phạm Đà Nẵng",
      experienceYears: 6,
      bio: "Năng động, kiên nhẫn, luôn tạo không khí vui tươi kích thích trẻ tập nói và phát triển khả năng vận động tự chủ.",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
      steamCert: "Chứng chỉ STEAM Vận động Cảm giác",
      assignedClass: "Lớp Nhà Trẻ Lớn (Little Explorers)"
    },
    {
      id: "t-4",
      name: "Cô Phan Trần Như Quỳnh",
      role: "Giáo viên Chủ nhiệm Khối Mầm STEAM",
      qualification: "Cử nhân GD Mầm non - ĐH Sư phạm TP.HCM",
      experienceYears: 7,
      bio: "Tài năng mỹ thuật xuất sắc, luôn hướng dẫn các bé tạo ra các tác phẩm nghệ thuật sáng tạo từ vật liệu thiên nhiên.",
      avatarUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80",
      steamCert: "Chứng chỉ Art in STEAM & Reggio Emilia",
      assignedClass: "Lớp Mầm STEAM (Creative Makers)"
    },
    {
      id: "t-5",
      name: "Thầy Mark William Anderson",
      role: "Chuyên gia Tiếng Anh Bản ngữ & STEAM Maker",
      qualification: "BA in Elementary Education - University of Melbourne",
      experienceYears: 9,
      bio: "Chứng chỉ TESOL quốc tế, phát âm chuẩn Anh - Úc, mang lại những giờ học ngoại ngữ và sáng tạo robot vui nhộn.",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      steamCert: "Lego Education Academy Certified Teacher",
      assignedClass: "Chương trình Tiếng Anh & STEAM Toàn trường"
    }
  ],

  news: [
    {
      id: "news-1",
      title: "Ngày hội Sáng tạo 'Little STEAM Expo 2026' tại BiBi Thiên Nga",
      category: "STEAM & Trải nghiệm",
      summary: "Các bé tại các khối lớp hào hứng trình bày sản phẩm sáng tạo từ vật liệu tái chế và trải nghiệm các trạm khoa học kỳ thú.",
      content: "Sáng thứ Bảy vừa qua, trường Mầm non BiBi Thiên Nga Steam Preschool đã tổ chức thành công ngày hội 'Little STEAM Expo'. Tại sự kiện, các bậc phụ huynh được trực tiếp chứng kiến những sản phẩm do chính bàn tay nhỏ bé của các con thực hiện: mô hình núi lửa phun trào an toàn, xe chạy bằng bóng bay phản lực, và khu vườn thẳng đứng tưới nước tự động. Sự kiện khẳng định hướng đi giáo dục thực hành, bồi dưỡng tư duy phản biện cho các bé ngay từ độ tuổi mầm non.",
      coverImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      date: "2026-10-24",
      author: "Ban Truyền Thông BiBi",
      isPublished: true,
      featured: true
    },
    {
      id: "news-2",
      title: "Thông báo tuyển sinh năm học mới: Khai mở tiềm năng từ 6 tháng đến 5 tuổi",
      category: "Thông báo",
      summary: "BiBi Thiên Nga chính thức mở cổng đăng ký năm học mới với nhiều chính sách ưu đãi học phí và quà tặng nhập học đặc biệt.",
      content: "Nhằm tạo điều kiện tốt nhất cho quý phụ huynh chuẩn bị môi trường học tập đầu đời chất lượng cho con, BiBi Thiên Nga STEAM Preschool tuyển sinh các độ tuổi từ 6 tháng đến 5 tuổi. Sĩ số lớp giới hạn chỉ từ 12-20 bé/lớp để đảm bảo sự chăm sóc chu đáo nhất từ các cô giáo. Quý phụ huynh hãy liên hệ ngay hotline 0707.609.131 hoặc đến trực tiếp số 37 Phan Văn Trị, Phường Khuê Trung, Quận Cẩm Lệ để tham quan không gian trường.",
      coverImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
      date: "2026-10-20",
      author: "Phòng Tuyển Sinh",
      isPublished: true,
      featured: true
    },
    {
      id: "news-3",
      title: "Dinh dưỡng học đường: Bí quyết giúp trẻ ăn ngon miệng và tăng cường miễn dịch mùa giao mùa",
      category: "Dinh dưỡng & Sức khỏe",
      summary: "Đội ngũ chuyên gia dinh dưỡng của BiBi Thiên Nga chia sẻ về nguyên tắc cân đối vi chất và thực đơn 5 bữa/ngày cho trẻ.",
      content: "Giai đoạn chuyển mùa thời tiết tại miền Trung dễ khiến trẻ bị viêm đường hô hấp hoặc biếng ăn. Tại BiBi Thiên Nga, thực đơn được thiết kế với sự tư vấn của chuyên gia dinh dưỡng Viện Dinh dưỡng Quốc gia, tăng cường nước ép hoa quả tươi giàu vitamin C, các món canh hầm thảo mộc dịu mát và bổ sung sữa chua lên men tự nhiên giúp đường ruột trẻ luôn khỏe mạnh.",
      coverImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
      date: "2026-10-15",
      author: "Bộ phận Dinh dưỡng & Y tế học đường",
      isPublished: true,
      featured: false
    }
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Giờ học pha trộn màu sắc diệu kỳ cùng khối Mầm STEAM",
      category: "Hoạt động STEAM",
      imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
      date: "2026-10-22",
      description: "Các bé thí nghiệm phân tách sắc tố màu qua giấy lọc và nước."
    },
    {
      id: "gal-2",
      title: "Chăm sóc luống rau sạch trong vườn trường BiBi",
      category: "Dã ngoại khám phá",
      imageUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80",
      date: "2026-10-18",
      description: "Bé tự tay tưới nước và theo dõi mầm cây nảy chồi mỗi buổi sáng."
    },
    {
      id: "gal-3",
      title: "Bữa trưa vui vẻ, tự lập của các bé lớp Nhà Trẻ",
      category: "Lớp học vui vẻ",
      imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
      date: "2026-10-14",
      description: "Tập xúc ăn gọn gàng và lễ phép mời cô cùng các bạn trước khi ăn."
    },
    {
      id: "gal-4",
      title: "Lắp ráp mô hình cối xay gió bằng Lego Education",
      category: "Hoạt động STEAM",
      imageUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80",
      date: "2026-10-10",
      description: "Ứng dụng năng lượng gió để tạo ra chuyển động quay."
    },
    {
      id: "gal-5",
      title: "Sân chơi cỏ nhân tạo và đồi cát sạch kháng khuẩn",
      category: "Cơ sở vật chất",
      imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
      date: "2026-10-05",
      description: "Không gian thoáng mát dưới tán cây xanh mát rượi tại 37 Phan Văn Trị."
    },
    {
      id: "gal-6",
      title: "Lễ hội Trung Thu ấm áp 'Đêm Trăng Cổ Tích'",
      category: "Lễ hội & Sự kiện",
      imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      date: "2026-09-28",
      description: "Bé tự làm lồng đèn từ vỏ lon tái chế và rước đèn cùng bạn bè."
    }
  ],

  inquiries: [
    {
      id: "inq-101",
      parentName: "Trần Anh Tuấn",
      phone: "0905123456",
      email: "tuan.tran@gmail.com",
      childName: "Bé Trần Minh Khôi",
      childAgeOrDob: "18 tháng",
      targetClass: "Lớp Nhà Trẻ Lớn (Little Explorers)",
      preferredVisitDate: "2026-11-02",
      notes: "Gia đình muốn cho con đi học làm quen xã hội, bé chưa tự xúc ăn được nhiều.",
      status: "visited",
      createdAt: "2026-10-26T08:30:00Z",
      staffNotes: "Phụ huynh đã đến tham quan sáng 27/10, rất hài lòng về phòng ngủ và camera. Đang chuẩn bị hồ sơ nhập học tuần tới."
    },
    {
      id: "inq-102",
      parentName: "Lê Thị Thu Thảo",
      phone: "0935987654",
      email: "thao.le@danang.gov.vn",
      childName: "Bé Lê Bảo An",
      childAgeOrDob: "3.5 tuổi",
      targetClass: "Lớp Mầm STEAM (Creative Makers)",
      preferredVisitDate: "2026-11-05",
      notes: "Bé rất thích vẽ và lắp ráp hình khối, muốn đăng ký học thêm lớp tiếng Anh.",
      status: "new",
      createdAt: "2026-10-27T14:15:00Z",
      staffNotes: "Hồ sơ mới gửi qua website, cần cô Trang gọi điện tư vấn trong sáng nay."
    },
    {
      id: "inq-103",
      parentName: "Hoàng Văn Nam",
      phone: "0914668899",
      email: "nam.hoang@invest.vn",
      childName: "Bé Hoàng Gia Hân",
      childAgeOrDob: "5 tuổi",
      targetClass: "Lớp Lá STEAM Tiền Tiểu Học (Future Leaders)",
      preferredVisitDate: "2026-10-30",
      notes: "Muốn chuẩn bị hành trang vào lớp 1 trường Quốc tế cho bé.",
      status: "contacted",
      createdAt: "2026-10-25T11:00:00Z",
      staffNotes: "Đã gọi điện tư vấn chương trình Tiền Tiểu học, hẹn thứ 5 tuần này ghé trường."
    }
  ],

  facilities: [
    {
      id: "fac-1",
      title: "Xưởng Khoa học & Công nghệ STEAM Lab",
      description: "Trang bị đầy đủ bộ thí nghiệm khoa học trực quan, bộ xếp hình Lego Education và robot mầm non giúp trẻ tư duy đa chiều.",
      iconName: "Atom",
      imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      highlight: "Học cụ chuẩn quốc tế"
    },
    {
      id: "fac-2",
      title: "Sân chơi cát & Vườn sinh thái tự nhiên",
      description: "Khuôn viên ngoài trời 300m² rợp bóng cây xanh, hố cát thủy tinh kháng khuẩn và bồn trồng rau sạch dành riêng cho bé.",
      iconName: "Trees",
      imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
      highlight: "Không gian xanh thoáng đãng"
    },
    {
      id: "fac-3",
      title: "Bếp ăn một chiều đạt chuẩn an toàn HACCP",
      description: "Thực phẩm tươi sạch từ các nông trại hữu cơ có chứng nhận VietGAP, nguồn nước ion kiềm tiệt trùng tuyệt đối.",
      iconName: "Utensils",
      imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
      highlight: "An toàn vệ sinh tuyệt đối"
    },
    {
      id: "fac-4",
      title: "Hệ thống Camera trực tuyến Full HD 24/7",
      description: "Phụ huynh có thể quan sát từng khoảnh khắc con học tập, vui chơi, ăn uống và nghỉ ngơi qua ứng dụng di động bảo mật cao.",
      iconName: "Camera",
      imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
      highlight: "Minh bạch - An tâm tuyệt đối"
    }
  ],

  testimonials: [
    {
      id: "test-1",
      parentName: "Mẹ Minh Thư",
      childName: "Bé Sushi (28 tháng)",
      childClass: "Lớp Nhà Trẻ Lớn",
      quote: "Gia đình mình ở gần đường Phan Văn Trị, gửi bé ở BiBi Thiên Nga từ lúc 14 tháng. Bé từ chỗ nhút nhát nay đã rất dạn dĩ, tự xúc cơm ăn và về nhà hay líu lo hát tiếng Anh. Các cô chăm sóc rất có tâm!",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      date: "2026-10-12",
      isApproved: true
    },
    {
      id: "test-2",
      parentName: "Bố Hoàng Long",
      childName: "Bé Ken (4 tuổi)",
      childClass: "Lớp Chồi STEAM",
      quote: "Chương trình STEAM ở đây rất sinh động, không bị lý thuyết khô khan. Con đi học về khoe mô hình cầu bập bênh và giải thích cách hoạt động làm cả nhà bất ngờ. Cơ sở vật chất mới và sạch sẽ vô cùng.",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      date: "2026-09-20",
      isApproved: true
    },
    {
      id: "test-3",
      parentName: "Mẹ Bích Ngọc",
      childName: "Bé Bơ (5 tuổi)",
      childClass: "Lớp Lá Tiền Tiểu Học",
      quote: "Học phí rất hợp lý so với chất lượng nhận được tại khu vực Cẩm Lệ. Thích nhất là thực đơn phong phú, bé ăn ngon miệng và tăng cân đều đặn. Cảm ơn cô Trang và ban giám hiệu nhà trường nhiều!",
      rating: 5,
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      date: "2026-10-02",
      isApproved: true
    }
  ]
};
