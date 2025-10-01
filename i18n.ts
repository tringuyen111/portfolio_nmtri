


import type { Project, Experience, SkillCategory, HeroData, NavLink, ContactMethod, AppContent } from './types';

export interface LanguageContent {
  navLinks: NavLink[];
  header: {
    logout: string;
    adminLogin: string;
    save: string;
    cancel: string;
    startEditing: string;
  };
  hero: HeroData;
  projects: {
    sectionTitle: string;
    title: string;
    addProject: string;
    viewProjectLink: string;
    overview: string;
    role: string;
    client: string;
    deliverables: string;
    date: string;
    tools: string;
  };
  projectsData: Project[];
  experience: {
    sectionTitle: string;
    title: string;
    subtitle: string;
    addExperience: string;
  };
  experiencesData: Experience[];
  skills: {
    sectionTitle: string;
    title: string;
    subtitle: string;
    addSkillCategory: string;
  };
  skillCategoriesData: SkillCategory[];
  contact: {
    title: string;
    subtitle: string;
    contactMethods: ContactMethod[];
  };
  modals: {
      loginTitle: string;
      loginButton: string;
      loginUsernamePlaceholder: string;
      loginPasswordPlaceholder: string;
      loginError: string;
      forgotPasswordLink: string;
      forgotPasswordHelp: string;
      editHeroTitle: string;
      saveChanges: string;
      addProjectTitle: string;
      editProjectTitle: string;
      saveProject: string;
      projectUrlLabel: string;
      projectRoleLabel: string;
      projectClientLabel: string;
      projectDateLabel: string;
      projectDeliverablesLabel: string;
      projectTitleLabel: string;
      projectDescriptionLabel: string;
      projectTechnologiesLabel: string;
      visitProjectLink: string;
      addExperienceTitle: string;
      editExperienceTitle: string;
      saveExperience: string;
      experienceUrlLabel: string;
      periodSettingsLabel: string;
      startDateLabel: string;
      endDateLabel: string;
      currentRoleCheckbox: string;
      periodPreviewLabel: string;
      addSkillCategoryTitle: string;
      editSkillCategoryTitle: string;
      saveSkillCategory: string;
      editContactTitle: string;
      saveContact: string;
      deleteProjectConfirmation: string;
      deleteExperienceConfirmation: string;
      deleteSkillCategoryConfirmation: string;
      localStorageError: string;
      unsavedChangesWarning: string;
      imageResolutionWarning: string;
      themeEditorTitle: string;
      fontSettings: string;
      sansSerifFont: string;
      serifFont: string;
      baseFontSize: string;
  }
}

export const initialContent: AppContent = {
  settings: {
    fontFamilySans: 'Inter',
    fontFamilySerif: 'Playfair Display',
    baseFontSize: 16,
  },
  en: {
    navLinks: [
        { text: 'Projects', href: '#projects' },
        { text: 'Experience', href: '#experience' },
        { text: 'Skills', href: '#skills' },
        { text: 'Contact', href: '#contact'},
    ],
    header: {
      logout: 'Logout',
      adminLogin: 'Admin',
      save: 'Save',
      cancel: 'Cancel',
      startEditing: 'Start Editing',
    },
    hero: {
      kicker: 'IT Business Analyst',
      title: 'Hello, I’m Tri Nguyen.',
      paragraphs: [
        'I am a <b>Business Analyst</b> - turning complex requirements into scalable, working systems.',
        '<b>I connect business needs with technology</b> by <b>listening</b>, <b>clarifying</b>, and <b>structuring requirements</b>, modeling processes, and turning them into <b>implementable documentation</b>.',
        'My focus is on <b>clarity</b>, <b>consistency</b>, and <b>scalability</b> — from the initial idea to a stable solution — ensuring that both business and technical teams <b>speak the same language</b>.'
      ],
      imageUrl: 'https://i.ibb.co/Vvz4w2W/professional-headshot.jpg',
    },
    projects: {
        sectionTitle: 'Portfolio',
        title: 'Featured Projects',
        addProject: 'Add Project',
        viewProjectLink: 'View Link',
        overview: 'Overview',
        role: 'Role',
        client: 'Client / Industry',
        deliverables: 'Deliverables',
        date: 'Date',
        tools: 'Tools',
    },
    projectsData: [
      {
        id: 1,
        title: 'Contract Management System (CMS) – Central Retail',
        description: 'A comprehensive system to manage the entire contract lifecycle, from creation, review, and approval to digital/physical signing, storage, and reporting.',
        role: 'Business Analyst & Assistant Project Manager',
        client: 'Central Retail in Vietnam',
        date: '2023 - 2024',
        deliverables: [
          'Developed Blueprint, FRD/URD, and detailed UI flows.',
          'Managed product backlog and sprints using Jira.',
          'Coordinated with development/QA teams and supported UAT.',
          'Designed dynamic approval workflows and security matrix.'
        ],
        technologies: ['Jira', 'Figma', 'SAP Integration', 'Digital Signature API'],
        coverImage: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=1200&auto=format&fit=crop',
        detailImages: ['https://picsum.photos/seed/cms2/1200/800', 'https://picsum.photos/seed/cms3/1200/800'],
        url: 'https://www.figma.com/proto/your-prototype-link-here',
      },
      {
        id: 2,
        title: 'RMS 2.0 (Repair & Maintenance System 2.0)',
        description: 'RMS 2.0 is a multi-functional platform designed for the MEM department of Suntory PepsiCo Vietnam (SPVB). The system streamlines the intake, processing, and management of service requests related to equipment maintenance at retail outlets. It optimizes spare part inventory through QR code labeling and full synchronization with SAP, ensuring data accuracy and operational efficiency.',
        role: 'Business Analyst',
        client: 'Suntory PepsiCo Vietnam (SPVB) – MEM Department',
        date: '2022 - 2023',
        deliverables: [
          'Business Requirements Document (BRD)',
          'User Requirements Document (URD)',
          'System Blueprint',
          'UI/UX Wireframes, Mockups (Figma)',
          'Integration Specifications (SAP, MEMS)',
          'UAT Test Plan',
        ],
        technologies: ['Figma', 'Microsoft Office', 'BPMN', 'Jira', 'AI', 'Visio'],
        coverImage: 'https://picsum.photos/seed/rms1/1200/800',
        detailImages: ['https://picsum.photos/seed/rms2/1200/800'],
        url: '',
      },
      {
        id: 3,
        title: 'Inventory – X Cloud',
        description: 'A Master Data module for the X Cloud inventory system, providing a centralized platform for managing asset information.',
        role: 'Business Analyst',
        client: 'X Cloud Inc.',
        date: '2022',
        deliverables: [
            'Designed the complete UI specifications for the Master Data module.',
            'Defined data structures for assets, models, serial numbers, and locations.',
            'Standardized UI patterns for List, Create/Edit, and View pages.',
        ],
        technologies: ['Figma', 'Jira', 'Cloud Architecture'],
        coverImage: 'https://picsum.photos/seed/inventory1/1200/800',
        detailImages: ['https://picsum.photos/seed/inventory2/1200/800'],
        url: 'https://github.com/your-repo-link-here',
      },
      {
        id: 4,
        title: 'Visitor & Security Management',
        description: 'A system to manage visitor and asset entry/exit using QR codes, enhancing security and streamlining the check-in/check-out process.',
        role: 'Business Analyst',
        client: 'Internal Corporate Project',
        date: '2021',
        deliverables: [
            'Defined requirements for four distinct user roles and their permissions.',
            'Designed user flows for pre-registration via email and on-site QR scanning.',
            'Developed logic for asset comparison upon entry and exit to prevent theft.',
        ],
        technologies: ['QR Code Systems', 'Figma', 'Access Control'],
        coverImage: 'https://picsum.photos/seed/visitor1/1200/800',
        detailImages: [],
        url: '',
      },
    ],
    experience: {
        sectionTitle: 'Career Path',
        title: 'Map Your Success',
        subtitle: 'My professional journey and educational background.',
        addExperience: 'Add Experience',
    },
    experiencesData: [
      { id: 1, role: 'Business Analyst', company: 'Delfi Technologies', period: 'Aug 2025 - Present', description: 'Analyzing business needs and developing technology solutions to drive efficiency and innovation.', url: 'https://delfi.com/' },
      { id: 2, role: 'Business Analyst', company: 'L.C.S CO., LTD', period: 'Mar 2024 - Aug 2025', description: 'Led BA activities for RMS, TMS, and E-Contract projects. Responsible for requirement analysis, creating Blueprint/BRD/URD, and designing mockups in Figma.', url: 'https://lcs.com.vn/' },
      { id: 3, role: 'Bachelor of Management Information Systems', company: 'Ho Chi Minh City University of Technology (HUTECH)', period: 'Aug 2020 - Jul 2024', description: 'Graduated with a GPA of 3.3/4.0, gaining a strong foundation in analyzing and designing information systems to solve business problems.', url: 'https://www.hutech.edu.vn/' },
    ],
    skills: {
        sectionTitle: 'My Expertise',
        title: "We've cracked the code.",
        subtitle: 'A versatile skillset to transform complex business requirements into tangible, high-quality software solutions.',
        addSkillCategory: 'Add Skill Category',
    },
    skillCategoriesData: [
      { id: 1, title: 'BA Deliverables', skills: ['BRD, URD/Blueprint', 'Data Dictionaries', 'Business Rules', 'User Stories & Acceptance Criteria', 'Traceability Matrix', 'UI/UX Mockups & Patterns'] },
      { id: 2, title: 'Methodologies & Tools', skills: ['Agile/Scrum', 'BPMN & UML', 'SQL', 'Jira', 'Figma', 'Microsoft Office', 'Visio'] },
      { id: 3, title: 'Core Competencies', skills: ['Effective Communication', 'Analytical & Systems Thinking', 'Problem Solving', 'Teamwork & Collaboration', 'Adaptability', 'Stakeholder Management'] },
    ],
    contact: {
        title: 'Connect with me',
        subtitle: "Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you.",
        contactMethods: [
            { type: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/nguyenmanhtri2907/' },
            { type: 'email', label: 'Email', url: 'mailto:nguyenmanhtri2907@gmail.com' },
            { type: 'phone', label: 'Phone', url: 'tel:0385547027' },
        ]
    },
    modals: {
        loginTitle: 'Admin Login',
        loginButton: 'Login',
        loginUsernamePlaceholder: 'Username',
        loginPasswordPlaceholder: 'Password',
        loginError: 'Invalid username or password.',
        forgotPasswordLink: 'Forgot Password?',
        forgotPasswordHelp: 'Password cannot be reset automatically. Please contact the site administrator if you have forgotten your credentials.',
        editHeroTitle: 'Edit Hero Section',
        saveChanges: 'Save Changes',
        addProjectTitle: 'Add New Project',
        editProjectTitle: 'Edit Project',
        saveProject: 'Save Project',
        projectUrlLabel: 'Project URL (e.g., prototype, repo)',
        projectRoleLabel: 'Role',
        projectClientLabel: 'Client / Industry',
        projectDateLabel: 'Date (Shared)',
        projectDeliverablesLabel: 'Deliverables',
        projectTitleLabel: 'Title',
        projectDescriptionLabel: 'Description',
        projectTechnologiesLabel: 'Technologies',
        visitProjectLink: 'Visit Project Link',
        addExperienceTitle: 'Add New Experience',
        editExperienceTitle: 'Edit Experience',
        saveExperience: 'Save Experience',
        experienceUrlLabel: 'Company/School URL',
        periodSettingsLabel: 'Period Settings',
        startDateLabel: 'Start Date',
        endDateLabel: 'End Date',
        currentRoleCheckbox: 'I currently work here',
        periodPreviewLabel: 'Period Preview',
        addSkillCategoryTitle: 'Add New Skill Category',
        editSkillCategoryTitle: 'Edit Skill Category',
        saveSkillCategory: 'Save Skill Category',
        editContactTitle: 'Edit Contact Section',
        saveContact: 'Save Contact',
        deleteProjectConfirmation: 'Are you sure you want to delete this project? This action cannot be undone.',
        deleteExperienceConfirmation: 'Are you sure you want to delete this experience entry? This action cannot be undone.',
        deleteSkillCategoryConfirmation: 'Are you sure you want to delete this skill category? This action cannot be undone.',
        localStorageError: 'Could not save changes. Data may be too large to be stored locally.',
        unsavedChangesWarning: 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.',
        imageResolutionWarning: 'For best results, upload high-resolution images (e.g., at least 1200px wide).',
        themeEditorTitle: 'Theme Editor',
        fontSettings: 'Font Settings',
        sansSerifFont: 'Body Font (Sans-serif)',
        serifFont: 'Heading Font (Serif)',
        baseFontSize: 'Base Font Size',
    }
  },
  vn: {
    navLinks: [
        { text: 'Dự án', href: '#projects' },
        { text: 'Kinh nghiệm', href: '#experience' },
        { text: 'Kỹ năng', href: '#skills' },
        { text: 'Liên hệ', href: '#contact' },
    ],
    header: {
      logout: 'Đăng xuất',
      adminLogin: 'Quản trị',
      save: 'Lưu',
      cancel: 'Hủy',
      startEditing: 'Bắt đầu Chỉnh sửa',
    },
    hero: {
      kicker: 'Chuyên viên Phân tích Nghiệp vụ CNTT',
      title: 'Xin chào, tôi là Trí Nguyễn.',
      paragraphs: [
          'Tôi là một <b>Business Analyst</b> - biến những yêu cầu phức tạp thành các hệ thống hoạt động hiệu quả và có khả năng mở rộng.',
          '<b>Tôi kết nối nhu cầu kinh doanh với công nghệ</b> bằng cách <b>lắng nghe</b>, <b>làm rõ</b>, và <b>cấu trúc các yêu cầu</b>, mô hình hóa quy trình, và biến chúng thành <b>tài liệu có thể triển khai</b>.',
          'Trọng tâm của tôi là <b>sự rõ ràng</b>, <b>tính nhất quán</b>, và <b>khả năng mở rộng</b> — từ ý tưởng ban đầu đến một giải pháp ổn định — đảm bảo rằng cả đội ngũ kinh doanh và kỹ thuật đều <b>nói cùng một ngôn ngữ</b>.'
      ],
      imageUrl: 'https://i.ibb.co/Vvz4w2W/professional-headshot.jpg',
    },
    projects: {
        sectionTitle: 'Portfolio',
        title: 'Dự án nổi bật',
        addProject: 'Thêm dự án',
        viewProjectLink: 'Xem Liên kết',
        overview: 'Tổng quan',
        role: 'Vai trò',
        client: 'Khách hàng / Ngành',
        deliverables: 'Sản phẩm bàn giao',
        date: 'Ngày',
        tools: 'Công cụ',
    },
    projectsData: [
      {
        id: 1,
        title: 'Hệ thống Quản lý Hợp đồng (CMS) – Central Retail',
        description: 'Một hệ thống toàn diện để quản lý toàn bộ vòng đời hợp đồng, từ tạo, xem xét, phê duyệt đến ký số/ký tay, lưu trữ và báo cáo.',
        role: 'Business Analyst & Trợ lý Quản lý Dự án',
        client: 'Central Retail tại Việt Nam',
        date: '2023 - 2024',
        deliverables: [
          'Phát triển Blueprint, FRD/URD, và luồng UI chi tiết.',
          'Quản lý product backlog và các sprint bằng Jira.',
          'Phối hợp với đội ngũ phát triển/QA và hỗ trợ UAT.',
          'Thiết kế quy trình phê duyệt động và ma trận bảo mật.'
        ],
        technologies: ['Jira', 'Figma', 'Tích hợp SAP', 'API Chữ ký số'],
        coverImage: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=1200&auto=format&fit=crop',
        detailImages: ['https://picsum.photos/seed/cms2/1200/800', 'https://picsum.photos/seed/cms3/1200/800'],
        url: 'https://www.figma.com/proto/your-prototype-link-here',
      },
      {
        id: 2,
        title: 'RMS 2.0 (Sửa chữa & Bảo trì)',
        description: 'RMS 2.0 là một nền tảng đa chức năng được thiết kế cho bộ phận MEM của Suntory PepsiCo Việt Nam (SPVB). Hệ thống hợp lý hóa việc tiếp nhận, xử lý và quản lý các yêu cầu dịch vụ liên quan đến bảo trì thiết bị tại các cửa hàng bán lẻ. Nó tối ưu hóa hàng tồn kho phụ tùng thông qua việc dán nhãn mã QR và đồng bộ hóa hoàn toàn với SAP, đảm bảo độ chính xác của dữ liệu và hiệu quả hoạt động.',
        role: 'Business Analyst',
        client: 'Suntory PepsiCo Vietnam (SPVB) – Bộ phận MEM',
        date: '2022 - 2023',
        deliverables: [
          'Tài liệu Yêu cầu Nghiệp vụ (BRD)',
          'Tài liệu Yêu cầu Người dùng (URD)',
          'Bản thiết kế Hệ thống (System Blueprint)',
          'Wireframes, Mockups UI/UX (Figma)',
          'Thông số kỹ thuật Tích hợp (SAP, MEMS)',
          'Kế hoạch Kiểm thử Chấp nhận Người dùng (UAT)',
        ],
        technologies: ['Figma', 'Microsoft Office', 'BPMN', 'Jira', 'AI', 'Visio'],
        coverImage: 'https://picsum.photos/seed/rms1/1200/800',
        detailImages: ['https://picsum.photos/seed/rms2/1200/800'],
        url: '',
      },
      {
        id: 3,
        title: 'Quản lý tồn kho – X Cloud',
        description: 'Module Master Data cho hệ thống quản lý tồn kho X Cloud, cung cấp nền tảng tập trung để quản lý thông tin tài sản.',
        role: 'Business Analyst',
        client: 'X Cloud Inc.',
        date: '2022',
        deliverables: [
            'Thiết kế toàn bộ đặc tả UI cho module Master Data.',
            'Xác định cấu trúc dữ liệu cho tài sản, model, số sê-ri và vị trí.',
            'Tiêu chuẩn hóa các mẫu UI cho các trang Danh sách, Tạo/Sửa và Xem.',
        ],
        technologies: ['Figma', 'Jira', 'Kiến trúc đám mây'],
        coverImage: 'https://picsum.photos/seed/inventory1/1200/800',
        detailImages: ['https://picsum.photos/seed/inventory2/1200/800'],
        url: 'https://github.com/your-repo-link-here',
      },
      {
        id: 4,
        title: 'Quản lý Khách và An ninh',
        description: 'Hệ thống quản lý khách và tài sản ra/vào bằng mã QR, tăng cường an ninh và hợp lý hóa quy trình check-in/check-out.',
        role: 'Business Analyst',
        client: 'Dự án nội bộ',
        date: '2021',
        deliverables: [
            'Xác định yêu cầu cho bốn vai trò người dùng khác nhau và quyền hạn của họ.',
            'Thiết kế luồng người dùng cho việc đăng ký trước qua email và quét mã QR tại chỗ.',
            'Phát triển logic so sánh tài sản khi ra và vào để chống trộm.',
        ],
        technologies: ['Hệ thống mã QR', 'Figma', 'Kiểm soát truy cập'],
        coverImage: 'https://picsum.photos/seed/visitor1/1200/800',
        detailImages: [],
        url: '',
      },
    ],
    experience: {
        sectionTitle: 'Con đường sự nghiệp',
        title: 'Hành trình của tôi',
        subtitle: 'Hành trình chuyên môn và nền tảng giáo dục của tôi.',
        addExperience: 'Thêm kinh nghiệm',
    },
    experiencesData: [
      { id: 1, role: 'Chuyên viên Phân tích nghiệp vụ', company: 'Delfi Technologies', period: 'Tháng 8 2025 - Hiện tại', description: 'Phân tích nhu cầu kinh doanh và phát triển các giải pháp công nghệ để thúc đẩy hiệu quả và đổi mới.', url: 'https://delfi.com/' },
      { id: 2, role: 'Chuyên viên Phân tích nghiệp vụ', company: 'L.C.S CO., LTD', period: 'Tháng 3 2024 - Tháng 8 2025', description: 'Dẫn dắt các hoạt động BA cho các dự án RMS, TMS và E-Contract. Chịu trách nhiệm phân tích yêu cầu, tạo Blueprint/BRD/URD và thiết kế mockup trên Figma.', url: 'https://lcs.com.vn/' },
      { id: 3, role: 'Cử nhân Hệ thống thông tin quản lý', company: 'Đại học Công nghệ TP.HCM (HUTECH)', period: 'Tháng 8 2020 - Tháng 7 2024', description: 'Tốt nghiệp với GPA 3.3/4.0, có nền tảng vững chắc về phân tích và thiết kế hệ thống thông tin để giải quyết các vấn đề kinh doanh.', url: 'https://www.hutech.edu.vn/' },
    ],
    skills: {
        sectionTitle: 'Chuyên môn',
        title: 'Bộ kỹ năng chuyên môn.',
        subtitle: 'Một bộ kỹ năng đa dạng để biến các yêu cầu kinh doanh phức tạp thành các giải pháp phần mềm hữu hình, chất lượng cao.',
        addSkillCategory: 'Thêm danh mục kỹ năng',
    },
    skillCategoriesData: [
      { id: 1, title: 'Sản phẩm BA', skills: ['BRD, URD/Blueprint', 'Từ điển dữ liệu', 'Quy tắc nghiệp vụ', 'User Stories & Tiêu chí chấp nhận', 'Ma trận truy vết', 'UI/UX Mockups & Patterns'] },
      { id: 2, title: 'Phương pháp & Công cụ', skills: ['Agile/Scrum', 'BPMN & UML', 'SQL', 'Jira', 'Figma', 'Microsoft Office', 'Visio'] },
      { id: 3, title: 'Năng lực cốt lõi', skills: ['Giao tiếp hiệu quả', 'Tư duy phân tích & hệ thống', 'Giải quyết vấn đề', 'Làm việc nhóm & Hợp tác', 'Khả năng thích ứng', 'Quản lý các bên liên quan'] },
    ],
    contact: {
        title: 'Kết nối với tôi',
        subtitle: 'Bạn có dự án hoặc muốn thảo luận về cơ hội hợp tác? Tôi rất mong được nghe từ bạn.',
        contactMethods: [
            { type: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/nguyenmanhtri2907/' },
            { type: 'email', label: 'Email', url: 'mailto:nguyenmanhtri2907@gmail.com' },
            { type: 'phone', label: 'Điện thoại', url: 'tel:0385547027' },
        ]
    },
    modals: {
        loginTitle: 'Đăng nhập Admin',
        loginButton: 'Đăng nhập',
        loginUsernamePlaceholder: 'Tên đăng nhập',
        loginPasswordPlaceholder: 'Mật khẩu',
        loginError: 'Tên đăng nhập hoặc mật khẩu không đúng.',
        forgotPasswordLink: 'Quên mật khẩu?',
        forgotPasswordHelp: 'Mật khẩu không thể tự động đặt lại. Vui lòng liên hệ quản trị viên trang web nếu bạn quên thông tin đăng nhập.',
        editHeroTitle: 'Chỉnh sửa Hero Section',
        saveChanges: 'Lưu thay đổi',
        addProjectTitle: 'Thêm dự án mới',
        editProjectTitle: 'Chỉnh sửa dự án',
        saveProject: 'Lưu dự án',
        projectUrlLabel: 'URL Dự án (VD: prototype, repo)',
        projectRoleLabel: 'Vai trò',
        projectClientLabel: 'Khách hàng / Ngành',
        projectDateLabel: 'Ngày (Chung)',
        projectDeliverablesLabel: 'Sản phẩm bàn giao',
        projectTitleLabel: 'Tiêu đề',
        projectDescriptionLabel: 'Mô tả',
        projectTechnologiesLabel: 'Công nghệ',
        visitProjectLink: 'Xem Liên kết Dự án',
        addExperienceTitle: 'Thêm kinh nghiệm mới',
        editExperienceTitle: 'Chỉnh sửa kinh nghiệm',
        saveExperience: 'Lưu kinh nghiệm',
        experienceUrlLabel: 'URL Công ty/Trường học',
        periodSettingsLabel: 'Cài đặt Thời gian',
        startDateLabel: 'Ngày bắt đầu',
        endDateLabel: 'Ngày kết thúc',
        currentRoleCheckbox: 'Tôi đang làm việc ở đây',
        periodPreviewLabel: 'Xem trước Thời gian',
        addSkillCategoryTitle: 'Thêm danh mục kỹ năng mới',
        editSkillCategoryTitle: 'Chỉnh sửa danh mục kỹ năng',
        saveSkillCategory: 'Lưu danh mục',
        editContactTitle: 'Chỉnh sửa mục Liên hệ',
        saveContact: 'Lưu Liên hệ',
        deleteProjectConfirmation: 'Bạn có chắc chắn muốn xóa dự án này không? Hành động này không thể hoàn tác.',
        deleteExperienceConfirmation: 'Bạn có chắc chắn muốn xóa mục kinh nghiệm này không? Hành động này không thể hoàn tác.',
        deleteSkillCategoryConfirmation: 'Bạn có chắc chắn muốn xóa danh mục kỹ năng này không? Hành động này không thể hoàn tác.',
        localStorageError: 'Không thể lưu các thay đổi. Dữ liệu có thể quá lớn để lưu trữ cục bộ.',
        unsavedChangesWarning: 'Bạn có những thay đổi chưa lưu. Bạn có chắc chắn muốn rời đi không? Các thay đổi sẽ bị mất.',
        imageResolutionWarning: 'Để có chất lượng tốt nhất, hãy tải lên hình ảnh có độ phân giải cao (ví dụ: chiều rộng ít nhất 1200px).',
        themeEditorTitle: 'Trình chỉnh sửa Giao diện',
        fontSettings: 'Cài đặt Phông chữ',
        sansSerifFont: 'Phông chữ Nội dung (Sans-serif)',
        serifFont: 'Phông chữ Tiêu đề (Serif)',
        baseFontSize: 'Cỡ chữ Cơ bản',
    }
  }
};