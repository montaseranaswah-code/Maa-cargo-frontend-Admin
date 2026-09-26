import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
    const [token, setToken] = useState(() => localStorage.getItem('token') || '');
    const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('is_admin') === '1');
    const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'home');
    const [lang, setLang] = useState('ar');
    const [isAnimating, setIsAnimating] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const [filterStatus, setFilterStatus] = useState('ALL');
    const [selectedClient, setSelectedClient] = useState('ALL');
    const [clientSearchText, setClientSearchText] = useState('');
    const [invoiceSearchText, setInvoiceSearchText] = useState('');

    const t = {
        ar: {
            brand: "MAA-CARGO",
            console: "لوحة تحكم المشرف والعمليات",
            home: "الرئيسية",
            dashboard: "لوحة التحكم",
            invoicesTab: "جرد وفواتير الشحنات",
            shipmentsTab: "إدارة الشحنات",
            logout: "تسجيل خروج",
            signIn: "تسجيل دخول",
            adminCenter: "— مركز تحكم المشرفين والعمليات اللوجستية",
            heroTitle: "النظام الذكي لإدارة الشحن الجوي والجمارك",
            heroDesc: "تحكم كامل ومطلق في بوليصات الشحن الدولي، جرد الفواتير المالية، احتساب الرسوم الجمركية الأردنية بدقة، ومتابعة العمليات من مكان واحد.",
            getStartedBtn: "الدخول للوحة التحكم",
            feature1Title: "حساب جمركي ذكي",
            feature1Desc: "حساب تلقائي للرسوم وضريبة المبيعات بنسبة 16% مع رسوم المناولة.",
            feature2Title: "جرد مالي وفواتير",
            feature2Desc: "سجل كامل للفواتير والتحصيل المالي مع إمكانية الطباعة والتصدير.",
            feature3Title: "بوليصات رسمية معتمدة",
            feature3Desc: "إصدار وطباعة بوليصات الشحن الجوي وشروط النقل الدولي.",
            operatorAccess: "تسجيل دخول المشرف",
            createAccount: "إنشاء حساب مشرف جديد",
            signInTitle: "تسجيل الدخول إلى بوابة المشرفين",
            signInDesc: "إدارة الشحنات، الرسوم الجمركية وسجلات النظام من مكان واحد.",
            fullName: "الاسم الكامل",
            emailLabel: "البريد الإلكتروني",
            passLabel: "كلمة المرور",
            registerBtn: "تسجيل حساب",
            loginBtn: "دخول",
            noAccount: "مشرف جديد؟ أنشئ حساب",
            hasAccount: "لديك حساب بالفعل؟ سجل دخولك",
            quickLookup: "بحث سريع عن شحنة",
            waybillPlaceholder: "أدخل رقم بوليصة الشحن (مثال: AIR-XXXXXX)",
            invoiceSearchPlaceholder: "ابحث برقم الفاتورة (مثال: INV-1001)...",
            search: "بحث",
            managementTitle: "إدارة عمليات الشحنات والرسوم الجمركية",
            invoicesTitle: "سجل جرد الفواتير والتحصيل المالي للشحنات",
            printMasterLedger: "طباعة تقرير الجرد الشامل",
            noShipments: "لا توجد شحنات مطابقة للبحث أو الفلتر.",
            editStatusRoute: "تعديل الحالة، المسار، الرسوم والدفع",
            printWaybill: "طباعة البوليصة الرسمية",
            printInvoice: "طباعة فاتورة الجرد",
            deleteWaybill: "حذف البوليصة",
            updateStatus: "تحديث الحالة:",
            updateRoute: "تحديث المسار (الوجهة):",
            updatePaymentStatus: "حالة الدفع:",
            paidStatusText: "مدفوعة (Paid)",
            unpaidStatusText: "غير مدفوعة (Unpaid)",
            customsFees: "الرسوم الجمركية والضريبة (حساب آلي حسب الجمارك الأردنية - $):",
            autoCalculate: "حساب آلي ذكي (حسب الوزن والنوع والطرود)",
            saveChanges: "حفظ التغييرات",
            cancel: "إلغاء",
            client: "العميل:",
            destination: "الوجهة:",
            weight: "الوزن الكلي (KG):",
            packagesLabel: "عدد الطرود (أرقام فقط):",
            declaredValueLabel: "القيمة المعلنة ($):",
            receiverAddressLabel: "عنوان المستلم:",
            description: "الوصف:",
            status: "الحالة:",
            paymentLabel: "حالة الدفع:",
            fees: "الرسوم الجمركية والتخليص:",
            createdAt: "تاريخ الإنشاء:",
            exportCSV: "تصدير تقرير (CSV)",
            exportInvoicesCSV: "تصدير جرد الفواتير (CSV)",
            refreshBtn: "تحديث البيانات",
            totalShipments: "إجمالي الشحنات",
            pendingShipments: "قيد المعالجة",
            deliveredShipments: "تم التوصيل",
            totalRevenue: "إجمالي الرسوم الجمركية",
            filterClientLabel: "تصفية حسب العميل:",
            clientSearchPlaceholder: "ابحث باسم العميل أو البريد...",
            allClients: "جميع العملاء (All Clients)",
            allStatus: "الكل (ALL)",
            pendingStatus: "قيد المعالجة",
            receivedStatus: "تم الاستلام",
            transitStatus: "في الشحن",
            arrivedStatus: "وصلت",
            deliveredStatus: "تم التوصيل",
            selectDestination: "اختر وجهة الشحن (Select Destination)",
            invoiceNo: "رقم الفاتورة",
            waybillNo: "رقم البوليصة",
            clientName: "اسم العميل",
            paymentCol: "حالة الدفع",
            invoiceActions: "إجراءات الفاتورة",
            printInvoiceBtn: "📄 طباعة الفاتورة",
            totalInvoicesIssued: "إجمالي الفواتير المصدرة",
            totalCustomsCollection: "إجمالي قيمة التحصيل الجمركي",
            invoicesCountSuffix: "فاتورة",
            searchResults: "نتيجة البحث:",
            manageSubTitle: "Manage system waybills, routes and customs clearance.",
            financialSubTitle: "Financial records, customs duties inventory, and billing management.",
            hubSubTitle: "Secure Air Freight & Customs System",
            destinations: [
                { value: "الإمارات - (DXB) مطار دبي الدولي", label: "الإمارات - (DXB) مطار دبي الدولي" },
                { value: "الإمارات - (AUH) مطار أبوظبي الدولي", label: "الإمارات - (AUH) مطار أبوظبي الدولي" },
                { value: "قطر - (DOH) مطار حمد الدولي", label: "قطر - (DOH) مطار حمد الدولي" },
                { value: "السعودية - (RUH) مطار الملك خالد - الرياض", label: "السعودية - (RUH) مطار الملك خالد - الرياض" },
                { value: "السعودية - (JED) مطار الملك عبد العزيز - جدة", label: "السعودية - (JED) مطار الملك عبد العزيز - جدة" },
                { value: "أمريكا - (JFK) مطار جون إف كينيدي - نيويورك", label: "أمريكا - (JFK) مطار جون إف كينيدي - نيويورك" },
                { value: "أمريكا - (LAX) مطار لوس أنجلوس الدولي", label: "أمريكا - (LAX) مطار لوس أنجلوس الدولي" },
                { value: "بريطانيا - (LHR) مطار هيثرو - لندن", label: "بريطانيا - (LHR) مطار هيثرو - لندن" },
                { value: "ألمانيا - (FRA) مطار فرانكفورت", label: "ألمانيا - (FRA) مطار فرانكفورت" },
                { value: "تركيا - (IST) مطار إسطنبول", label: "تركيا - (IST) مطار إسطنبول" }
            ]
        },
        en: {
            brand: "MAA-CARGO",
            console: "ADMIN CONSOLE",
            home: "Home",
            dashboard: "Dashboard",
            invoicesTab: "Invoices & Ledger",
            shipmentsTab: "Shipments Management",
            logout: "Logout",
            signIn: "Sign In",
            adminCenter: "— ADMIN & LOGISTICS CONTROL CENTER",
            heroTitle: "Smart Air Freight & Customs Management",
            heroDesc: "Absolute control over international air waybills, financial invoice ledgers, accurate Jordanian customs calculations, and operations tracking.",
            getStartedBtn: "Access Dashboard",
            feature1Title: "Smart Customs Calculation",
            feature1Desc: "Automated calculation of duties, 16% sales tax, and handling fees.",
            feature2Title: "Financial Invoices Ledger",
            feature2Desc: "Complete billing and collection records with print and export features.",
            feature3Title: "Official Certified Waybills",
            feature3Desc: "Issue and print official air freight waybills and terms.",
            operatorAccess: "OPERATOR ACCESS",
            createAccount: "Create Operator Account",
            signInTitle: "Sign in to Admin Portal",
            signInDesc: "Manage shipments, customs fees and system logs.",
            fullName: "Full Name",
            emailLabel: "Email Address",
            passLabel: "Password",
            registerBtn: "Register Account",
            loginBtn: "Sign In",
            noAccount: "New Operator? Create account.",
            hasAccount: "Already have an account? Sign In",
            quickLookup: "Quick Shipment Lookup",
            waybillPlaceholder: "Enter Air Waybill Number (e.g. AIR-XXXXXX)",
            invoiceSearchPlaceholder: "Search by invoice no (e.g. INV-1001)...",
            search: "Search",
            managementTitle: "Shipments & Customs Management",
            invoicesTitle: "Invoices Ledger & Financial Collection",
            printMasterLedger: "Print Master Ledger Report",
            noShipments: "No matching shipments found.",
            editStatusRoute: "Edit Status, Route, Fees & Payment",
            printWaybill: "Print Official Waybill",
            printInvoice: "Print Invoice",
            deleteWaybill: "Delete Waybill",
            updateStatus: "Update Status:",
            updateRoute: "Update Route (Destination):",
            updatePaymentStatus: "Payment Status:",
            paidStatusText: "Paid",
            unpaidStatusText: "Unpaid",
            customsFees: "Customs & Sales Tax (Auto Jordanian Customs Calc - $):",
            autoCalculate: "Auto Calculate (Jordanian Customs)",
            saveChanges: "Save Changes",
            cancel: "Cancel",
            client: "Client:",
            destination: "Destination:",
            weight: "Total Weight (KG):",
            packagesLabel: "Packages Count:",
            declaredValueLabel: "Declared Value ($):",
            receiverAddressLabel: "Receiver Address:",
            description: "Description:",
            status: "Status:",
            paymentLabel: "Payment Status:",
            fees: "Customs & Clearance:",
            createdAt: "Created At:",
            exportCSV: "Export Report (CSV)",
            exportInvoicesCSV: "Export Invoices Ledger (CSV)",
            refreshBtn: "Refresh Data",
            totalShipments: "Total Shipments",
            pendingShipments: "Pending",
            deliveredShipments: "Delivered",
            totalRevenue: "Total Customs Fees",
            filterClientLabel: "Filter by Client:",
            clientSearchPlaceholder: "Search client name or email...",
            allClients: "All Clients",
            allStatus: "ALL",
            pendingStatus: "Pending",
            receivedStatus: "Received",
            transitStatus: "In Transit",
            arrivedStatus: "Arrived",
            deliveredStatus: "Delivered",
            selectDestination: "Select Destination",
            invoiceNo: "Invoice No",
            waybillNo: "Waybill No",
            clientName: "Client Name",
            paymentCol: "Payment Status",
            invoiceActions: "Invoice Actions",
            printInvoiceBtn: "📄 Print Invoice",
            totalInvoicesIssued: "Total Invoices Issued",
            totalCustomsCollection: "Total Customs Collection",
            invoicesCountSuffix: "Invoices",
            searchResults: "Search Result:",
            manageSubTitle: "Manage system waybills, routes and customs clearance.",
            financialSubTitle: "Financial records, customs duties inventory, and billing management.",
            hubSubTitle: "Secure Air Freight & Customs System",
            destinations: [
                { value: "UAE - Dubai International Airport (DXB)", label: "UAE - Dubai International Airport (DXB)" },
                { value: "UAE - Abu Dhabi International Airport (AUH)", label: "UAE - Abu Dhabi International Airport (AUH)" },
                { value: "Qatar - Hamad International Airport (DOH)", label: "Qatar - Hamad International Airport (DOH)" },
                { value: "Saudi Arabia - King Khalid Airport - Riyadh (RUH)", label: "Saudi Arabia - King Khalid Airport - Riyadh (RUH)" },
                { value: "Saudi Arabia - King Abdulaziz Airport - Jeddah (JED)", label: "Saudi Arabia - King Abdulaziz Airport - Jeddah (JED)" },
                { value: "USA - JFK International Airport - New York (JFK)", label: "USA - JFK International Airport - New York (JFK)" },
                { value: "USA - Los Angeles International Airport (LAX)", label: "USA - Los Angeles International Airport (LAX)" },
                { value: "UK - Heathrow Airport - London (LHR)", label: "UK - Heathrow Airport - London (LHR)" },
                { value: "Germany - Frankfurt Airport (FRA)", label: "Germany - Frankfurt Airport (FRA)" },
                { value: "Turkey - Istanbul Airport (IST)", label: "Turkey - Istanbul Airport (IST)" }
            ]
        }
    };

    const currentText = t[lang];

    const [shipments, setShipments] = useState([]);
    const [trackingInput, setTrackingInput] = useState('');
    const [trackingResult, setTrackingResult] = useState(null);

    const [editingShipment, setEditingShipment] = useState(null);
    const [editStatus, setEditStatus] = useState('');
    const [editDestination, setEditDestination] = useState('');
    const [editPaymentStatus, setEditPaymentStatus] = useState('Unpaid');
    const [editFees, setEditFees] = useState('');
    const [editWeight, setEditWeight] = useState('');
    const [editPackages, setEditPackages] = useState('1');
    const [editDeclaredValue, setEditDeclaredValue] = useState('0');
    const [editReceiverAddress, setEditReceiverAddress] = useState('');

    const handleTabChange = (tab) => {
        setIsAnimating(true);
        setTimeout(() => {
            setActiveTab(tab);
            localStorage.setItem('activeTab', tab);
            window.scrollTo(0, 0);
            setIsAnimating(false);
        }, 250);
    };

    useEffect(() => {
        if (token) {
            fetchShipments();
        }
    }, [token]);

    const fetchShipments = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/shipments', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setShipments(res.data);
        } catch (err) {
            console.error('Error fetching shipments', err);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/login', { email, password });
            const accessToken = res.data.access_token;
            const adminStatus = res.data.user.is_admin == 1 ? '1' : '0';

            setToken(accessToken);
            setIsAdmin(res.data.user.is_admin == 1);
            
            localStorage.setItem('token', accessToken);
            localStorage.setItem('is_admin', adminStatus);
            
            handleTabChange('dashboard');
        } catch (err) {
            alert(lang === 'ar' ? 'فشل تسجيل الدخول، تأكد من البيانات' : 'Login failed, check your credentials');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/register', { name, email, password });
            const accessToken = res.data.access_token;
            const adminStatus = res.data.user.is_admin == 1 ? '1' : '0';

            setToken(accessToken);
            setIsAdmin(res.data.user.is_admin == 1);
            
            localStorage.setItem('token', accessToken);
            localStorage.setItem('is_admin', adminStatus);
            
            handleTabChange('dashboard');
        } catch (err) {
            alert(lang === 'ar' ? 'فشل إنشاء الحساب، تأكد من البيانات أو البريد مستخدم مسبقاً' : 'Registration failed, email might be in use');
        }
    };

    const handleTrackSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:8000/api/shipments/track/${trackingInput}`);
            setTrackingResult(res.data);
        } catch (err) {
            alert(lang === 'ar' ? 'رقم التتبع غير موجود أو خطأ في البحث' : 'Waybill not found or search error');
            setTrackingResult(null);
        }
    };

    const calculateSmartCustomsCustom = (w, desc, pkgCount, decVal) => {
        const weight = parseFloat(w) || 1;
        const d = (desc || '').toLowerCase();
        let packagesCount = parseInt(pkgCount) || 1;
        let declaredVal = parseFloat(decVal) || 0;

        let tariffRate = 0.10;
        let baseItemValue = 12;

        if (d.includes('أدوية') || d.includes('مستلزمات طبية') || d.includes('medical') || d.includes('medicine')) {
            tariffRate = 0.05;
            baseItemValue = 20;
        } else if (d.includes('ملابس') || d.includes('أقمشة') || d.includes('clothes') || d.includes('apparel')) {
            tariffRate = 0.20;
            baseItemValue = 10;
        } else if (d.includes('إلكترونيات') || d.includes('أجهزة') || d.includes('electronics')) {
            tariffRate = 0.25;
            baseItemValue = 30;
        }

        const estimatedValue = declaredVal > 0 ? declaredVal : (weight * baseItemValue);
        let customsDuty = estimatedValue * tariffRate;
        if (customsDuty < 5) customsDuty = 5;

        const handlingFee = packagesCount * 2.5;
        const salesTax = (estimatedValue + customsDuty) * 0.16;

        return (customsDuty + salesTax + handlingFee).toFixed(2);
    };

    const calculateSmartCustoms = (item) => {
        let desc = item.description || '';
        let pkg = "1";
        let dec = "0";
        if (desc.includes('الطرود:')) {
            const parts = desc.split('|');
            parts.forEach(p => {
                if (p.includes('الطرود:')) pkg = p.replace('الطرود:', '').trim();
                if (p.includes('القيمة المعلنة:')) dec = p.replace('القيمة المعلنة:', '').replace('$', '').trim();
            });
        }
        return calculateSmartCustomsCustom(item.weight, desc, pkg, dec);
    };

    const handleUpdateStatus = async (e, item) => {
        e.preventDefault();
        try {
            let oldDesc = item.description || '';
            let newDesc = '';
            if (oldDesc.includes('المصدر:')) {
                const parts = oldDesc.split('|');
                newDesc = parts.map(p => {
                    if (p.includes('الطرود:')) return ` الطرود: ${editPackages}`;
                    if (p.includes('القيمة المعلنة:')) return ` القيمة المعلنة: $${editDeclaredValue}`;
                    if (p.includes('عنوان المستلم:')) return ` عنوان المستلم: ${editReceiverAddress}`;
                    return p;
                }).join('|');
            } else {
                newDesc = `المصدر: عام | الطرود: ${editPackages} | التسليم: تسليم المطار (Airport-to-Airport) | هاتف المستلم: غير متوفر | الرقم الوطني: غير متوفر | عنوان المستلم: ${editReceiverAddress} | القيمة المعلنة: $${editDeclaredValue} | ملاحظات: ${oldDesc}`;
            }

            await axios.put(`http://localhost:8000/api/shipments/${item.id}/status`, {
                status: editStatus,
                destination: editDestination,
                weight: parseFloat(editWeight) || item.weight,
                customs_fees: parseFloat(editFees) || 0,
                description: newDesc,
                payment_status: editPaymentStatus
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(lang === 'ar' ? 'تم تحديث بيانات الشحنة والدفع بنجاح!' : 'Shipment and payment details updated successfully!');
            setEditingShipment(null);
            fetchShipments();
        } catch (err) {
            const serverMessage = err.response?.data?.message || err.message;
            alert(lang === 'ar' ? `خطأ: ${serverMessage}` : `Error: ${serverMessage}`);
        }
    };

    const handleDeleteShipment = async (id) => {
        if (!window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه الشحنة؟' : 'Are you sure you want to delete this shipment?')) return;
        try {
            await axios.delete(`http://localhost:8000/api/shipments/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(lang === 'ar' ? 'تم حذف الشحنة بنجاح' : 'Shipment deleted successfully');
            fetchShipments();
        } catch (err) {
            alert(lang === 'ar' ? 'فشل حذف الشحنة' : 'Failed to delete shipment');
        }
    };

    const handlePrintWaybill = (item) => {
        const finalFees = (item.customs_fees && parseFloat(item.customs_fees) > 0) ? item.customs_fees : calculateSmartCustoms(item);
        const pStatusText = (item.payment_status === 'Paid') ? (lang === 'ar' ? 'مدفوعة (Paid)' : 'Paid') : (lang === 'ar' ? 'غير مدفوعة (Unpaid)' : 'Unpaid');
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
            <head>
                <meta charset="UTF-8">
                <title>Air Waybill - ${item.tracking_number}</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 25px; color: #111; direction: ${lang === 'ar' ? 'rtl' : 'ltr'}; text-align: ${lang === 'ar' ? 'right' : 'left'}; }
                    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px; align-items: center; }
                    .logo { font-size: 22px; font-weight: bold; letter-spacing: 1px; }
                    .awb-box { border: 2px solid #000; padding: 8px 15px; font-size: 16px; font-weight: bold; text-align: center; background: #f9f9f9; }
                    .grid-2 { display: flex; gap: 15px; margin-bottom: 15px; }
                    .section { flex: 1; border: 1px solid #333; padding: 12px; border-radius: 4px; }
                    .section-title { font-weight: bold; background: #e5e7eb; padding: 5px 10px; margin: -12px -12px 10px -12px; border-bottom: 1px solid #333; font-size: 13px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 5px; }
                    th, td { border: 1px solid #444; padding: 8px; text-align: ${lang === 'ar' ? 'right' : 'left'}; font-size: 13px; }
                    th { background: #f3f4f6; }
                    .footer { display: flex; justify-content: space-between; margin-top: 35px; text-align: center; }
                    .sign-box { border-top: 1px dashed #000; width: 180px; padding-top: 8px; margin-top: 45px; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div>
                        <div class="logo">MAA-CARGO AIR FREIGHT</div>
                        <div style="font-size: 12px; color: #555;">${lang === 'ar' ? 'خدمات الشحن الجوي والتخليص الجمركي الدولي (المملكة الأردنية الهاشمية)' : 'International Air Freight & Customs Clearance (Hashemite Kingdom of Jordan)'}</div>
                        <div style="font-size: 11px; color: #666; direction: ltr; text-align: left;">Tel: 009626000000 | Email: operations@maacargo.com</div>
                    </div>
                    <div>
                        <div class="awb-box" style="direction: ltr;">AWB: ${item.tracking_number}</div>
                        <div style="margin-top: 4px; font-size: 11px; text-align: center;">Issue Date: ${item.created_at || 'Current Session'}</div>
                    </div>
                </div>

                <div class="grid-2">
                    <div class="section">
                        <div class="section-title">${lang === 'ar' ? 'بيانات الشاحن والعميل (Shipper & Client Info)' : 'Shipper & Client Info'}</div>
                        <p style="margin: 6px 0;"><strong>${lang === 'ar' ? 'الاسم (Name):' : 'Name:'}</strong> ${item.user_name}</p>
                        <p style="margin: 6px 0; direction: ltr; text-align: left;"><strong>Email:</strong> ${item.user_email}</p>
                    </div>
                    <div class="section">
                        <div class="section-title">${lang === 'ar' ? 'مسار الرحلة والوجهة (Routing & Destination)' : 'Routing & Destination'}</div>
                        <p style="margin: 6px 0;"><strong>${lang === 'ar' ? 'وجهة الوصول:' : 'Destination:'}</strong> ${item.destination}</p>
                        <p style="margin: 6px 0;"><strong>${lang === 'ar' ? 'الحالة التشغيلية:' : 'Status:'}</strong> ${item.status}</p>
                        <p style="margin: 6px 0;"><strong>${lang === 'ar' ? 'حالة الدفع:' : 'Payment Status:'}</strong> ${pStatusText}</p>
                    </div>
                </div>

                <div class="section" style="margin-bottom: 15px;">
                    <div class="section-title">${lang === 'ar' ? 'تفاصيل البضاعة والرسوم حسب الجمارك الأردنية (Cargo & Customs)' : 'Cargo & Customs Details'}</div>
                    <table>
                        <tr>
                            <th>${lang === 'ar' ? 'وصف البضاعة / المحتوى' : 'Description / Content'}</th>
                            <th>${lang === 'ar' ? 'الوزن الكلي' : 'Total Weight'}</th>
                            <th>${lang === 'ar' ? 'الرسوم الجمركية والضريبة ($)' : 'Customs & Tax ($)'}</th>
                        </tr>
                        <tr>
                            <td>${item.description || (lang === 'ar' ? 'شحنة عامة / General Cargo' : 'General Cargo')}</td>
                            <td>${item.weight} KG</td>
                            <td>$${finalFees}</td>
                        </tr>
                    </table>
                </div>

                <div class="footer">
                    <div>
                        <div style="font-size: 12px;">${lang === 'ar' ? 'توقيع موظف الاستلام' : 'Received By Signature'}</div>
                        <div class="sign-box">Received By</div>
                    </div>
                    <div>
                        <div style="font-size: 12px;">${lang === 'ar' ? 'ختم التخليص الرسمي' : 'Customs Stamp'}</div>
                        <div style="width: 110px; height: 50px; border: 1px dashed #666; margin: 8px auto 0 auto; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #777;">Customs Stamp</div>
                    </div>
                    <div>
                        <div style="font-size: 12px;">${lang === 'ar' ? 'توقيع العميل / المستلم' : 'Consignee Signature'}</div>
                        <div class="sign-box">Consignee Signature</div>
                    </div>
                </div>

                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    const handlePrintInvoice = (item, invoiceId) => {
        const finalFees = (item.customs_fees && parseFloat(item.customs_fees) > 0) ? item.customs_fees : calculateSmartCustoms(item);
        const pStatusText = (item.payment_status === 'Paid') ? (lang === 'ar' ? 'مدفوعة (Paid)' : 'Paid') : (lang === 'ar' ? 'غير مدفوعة (Unpaid)' : 'Unpaid');
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
            <head>
                <meta charset="UTF-8">
                <title>Invoice - ${invoiceId}</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #111; direction: ${lang === 'ar' ? 'rtl' : 'ltr'}; text-align: ${lang === 'ar' ? 'right' : 'left'}; }
                    .inv-header { display: flex; justify-content: space-between; border-bottom: 3px solid #38bdf8; padding-bottom: 15px; margin-bottom: 25px; align-items: center; }
                    .company-name { font-size: 24px; font-weight: bold; color: #040b16; }
                    .inv-box { border: 2px solid #040b16; padding: 10px 20px; text-align: center; background: #fdfbf7; }
                    .client-box { background: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 25px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    th, td { border: 1px solid #ccc; padding: 12px; text-align: ${lang === 'ar' ? 'right' : 'left'}; font-size: 14px; }
                    th { background: #040b16; color: #fff; }
                    .total-row { font-weight: bold; background: #fef3c7; }
                    .stamp-area { display: flex; justify-content: space-between; margin-top: 50px; }
                    .signature-line { border-top: 1px solid #000; width: 200px; text-align: center; padding-top: 8px; margin-top: 50px; }
                </style>
            </head>
            <body>
                <div class="inv-header">
                    <div>
                        <div class="company-name">MAA-CARGO LOGISTICS</div>
                        <div style="font-size: 13px; color: #555;">${lang === 'ar' ? 'فاتورة رسمية لجرد الرسوم الجمركية والخدمات اللوجستية' : 'Official Invoice for Customs Duties & Logistics Services'}</div>
                        <div style="font-size: 11px; color: #777; direction: ltr; text-align: left;">Amman, Jordan | Tax ID: 987654321</div>
                    </div>
                    <div>
                        <div class="inv-box">
                            <div style="font-size: 12px; color: #555;">Invoice No</div>
                            <div style="font-size: 18px; font-weight: bold; direction: ltr;">${invoiceId}</div>
                            <div style="font-size: 11px; color: #777;">Date: ${new Date().toISOString().split('T')[0]}</div>
                        </div>
                    </div>
                </div>

                <div class="client-box">
                    <strong>${lang === 'ar' ? 'معلومات العميل (Client Details):' : 'Client Details:'}</strong>
                    <p style="margin: 5px 0;">${lang === 'ar' ? 'الاسم:' : 'Name:'} ${item.user_name}</p>
                    <p style="margin: 5px 0; direction: ltr; text-align: left;">${lang === 'ar' ? 'البريد الإلكتروني:' : 'Email:'} ${item.user_email}</p>
                    <p style="margin: 5px 0;">${lang === 'ar' ? 'بوليصة الشحن المرتبطة:' : 'Waybill:'} <span style="font-weight: bold; color: #2563eb;">${item.tracking_number}</span></p>
                    <p style="margin: 5px 0;">${lang === 'ar' ? 'حالة الدفع المالية:' : 'Payment Status:'} <span style="font-weight: bold; color: ${item.payment_status === 'Paid' ? '#10b981' : '#ef4444'};">${pStatusText}</span></p>
                </div>

                <table>
                    <tr>
                        <th>${lang === 'ar' ? 'البيان / الوصف' : 'Description'}</th>
                        <th>${lang === 'ar' ? 'الوجهة' : 'Destination'}</th>
                        <th>${lang === 'ar' ? 'الوزن (KG)' : 'Weight (KG)'}</th>
                        <th>${lang === 'ar' ? 'المبلغ والرسوم الشاملة ($)' : 'Total Fees ($)'}</th>
                    </tr>
                    <tr>
                        <td>${item.description || (lang === 'ar' ? 'رسوم تخليص جمركي وشحن جوي' : 'Customs clearance & air freight fees')}</td>
                        <td>${item.destination}</td>
                        <td>${item.weight} KG</td>
                        <td>$${finalFees}</td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="3" style="text-align: ${lang === 'ar' ? 'left' : 'right'};">${lang === 'ar' ? 'الإجمالي الواجب سداده (Total Due):' : 'Total Due:'}</td>
                        <td>$${finalFees} USD</td>
                    </tr>
                </table>

                <div style="font-size: 12px; color: #555; border-${lang === 'ar' ? 'right' : 'left'}: 3px solid #38bdf8; padding-${lang === 'ar' ? 'right' : 'left'}: 10px; margin-bottom: 40px;">
                    ${lang === 'ar' ? 'ملاحظة هامة: هذه الفاتورة صادرة إلكترونياً من نظام MAA-Cargo للجرد المالي وتعتبر رسمية بعد اعتمادها بختم الإدارة.' : 'Important Note: This invoice is issued electronically from the MAA-Cargo system and is official when stamped.'}
                </div>

                <div class="stamp-area">
                    <div>
                        <div style="font-size: 13px;">${lang === 'ar' ? 'اعتماد قسم الحسابات الجمركية' : 'Accounts Department Approval'}</div>
                        <div class="signature-line">Accounts Department</div>
                    </div>
                    <div style="width: 120px; height: 60px; border: 2px dashed #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #0284c7; text-align: center;">
                        MAA-CARGO<br>OFFICIAL STAMP
                    </div>
                </div>

                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    const handlePrintMasterLedger = () => {
        const printWindow = window.open('', '_blank');
        let tableRows = '';
        let totalSum = 0;
        let totalW = 0;

        shipments.forEach((item, index) => {
            const fFees = parseFloat((item.customs_fees && parseFloat(item.customs_fees) > 0) ? item.customs_fees : calculateSmartCustoms(item));
            totalSum += fFees;
            totalW += parseFloat(item.weight) || 0;
            const invId = "INV-" + (1001 + index);
            const pStatusText = (item.payment_status === 'Paid') ? (lang === 'ar' ? 'مدفوعة' : 'Paid') : (lang === 'ar' ? 'غير مدفوعة' : 'Unpaid');

            tableRows += `
                <tr>
                    <td>${invId}</td>
                    <td>${item.tracking_number}</td>
                    <td>${item.user_name}</td>
                    <td>${item.destination}</td>
                    <td>${item.weight} KG</td>
                    <td>$${fFees.toFixed(2)}</td>
                    <td>${pStatusText}</td>
                    <td>${item.status}</td>
                </tr>
            `;
        });

        printWindow.document.write(`
            <html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
            <head>
                <meta charset="UTF-8">
                <title>Master Invoices Ledger Report - MAA-CARGO</title>
                <style>
                    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #111; direction: ${lang === 'ar' ? 'rtl' : 'ltr'}; text-align: ${lang === 'ar' ? 'right' : 'left'}; }
                    .header { display: flex; justify-content: space-between; border-bottom: 3px solid #38bdf8; padding-bottom: 15px; margin-bottom: 25px; align-items: center; }
                    .company { font-size: 24px; font-weight: bold; color: #040b16; }
                    .meta-box { border: 2px solid #040b16; padding: 10px 15px; text-align: center; background: #fdfbf7; font-size: 12px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    th, td { border: 1px solid #ccc; padding: 10px; text-align: ${lang === 'ar' ? 'right' : 'left'}; font-size: 13px; }
                    th { background: #040b16; color: #fff; }
                    .summary-box { display: flex; gap: 20px; margin-bottom: 25px; }
                    .summary-card { background: #f3f4f6; border: 1px solid #ccc; padding: 15px; flex: 1; border-radius: 6px; }
                    .footer { display: flex; justify-content: space-between; margin-top: 50px; }
                    .sign-line { border-top: 1px solid #000; width: 200px; text-align: center; padding-top: 8px; margin-top: 50px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div>
                        <div class="company">MAA-CARGO LOGISTICS</div>
                        <div style="font-size: 13px; color: #555;">${lang === 'ar' ? 'تقرير الجرد المالي الشامل للفواتير وحسابات الجمارك' : 'Master Financial Invoices Ledger & Customs Report'}</div>
                        <div style="font-size: 11px; color: #777; direction: ltr; text-align: left;">Amman, Jordan | operations@maacargo.com</div>
                    </div>
                    <div class="meta-box">
                        <div><strong>Date:</strong> ${new Date().toISOString().split('T')[0]}</div>
                        <div><strong>Status:</strong> Verified</div>
                    </div>
                </div>

                <div class="summary-box">
                    <div class="summary-card">
                        <div style="font-size: 12px; color: #666;">${lang === 'ar' ? 'إجمالي عدد الفواتير:' : 'Total Invoices:'}</div>
                        <div style="font-size: 20px; font-weight: bold; color: #040b16;">${shipments.length}</div>
                    </div>
                    <div class="summary-card">
                        <div style="font-size: 12px; color: #666;">${lang === 'ar' ? 'إجمالي الوزن المنقول:' : 'Total Weight:'}</div>
                        <div style="font-size: 20px; font-weight: bold; color: #040b16;">${totalW} KG</div>
                    </div>
                    <div class="summary-card" style="background: #e0f2fe; border-color: #38bdf8;">
                        <div style="font-size: 12px; color: #0369a1;">${lang === 'ar' ? 'إجمالي التحصيل المالي والجمارك:' : 'Total Customs Collection:'}</div>
                        <div style="font-size: 20px; font-weight: bold; color: #0284c7;">$${totalSum.toFixed(2)} USD</div>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>${lang === 'ar' ? 'رقم الفاتورة' : 'Invoice No'}</th>
                            <th>${lang === 'ar' ? 'رقم البوليصة' : 'Waybill'}</th>
                            <th>${lang === 'ar' ? 'اسم العميل' : 'Client Name'}</th>
                            <th>${lang === 'ar' ? 'الوجهة' : 'Destination'}</th>
                            <th>${lang === 'ar' ? 'الوزن' : 'Weight'}</th>
                            <th>${lang === 'ar' ? 'الرسوم ($)' : 'Fees ($)'}</th>
                            <th>${lang === 'ar' ? 'حالة الدفع' : 'Payment'}</th>
                            <th>${lang === 'ar' ? 'الحالة' : 'Status'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>

                <div class="footer">
                    <div>
                        <div style="font-size: 13px;">Chief Accountant</div>
                        <div class="sign-line">Signature</div>
                    </div>
                    <div>
                        <div style="font-size: 13px;">General Management</div>
                        <div class="sign-line">Stamp</div>
                    </div>
                </div>

                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    const exportToCSV = () => {
        let csvContent = "\uFEFFdata:text/csv;charset=utf-8,Tracking Number,Client,Destination,Weight,Customs Fees,Payment Status,Status,Created At\n";
        shipments.forEach(item => {
            const fFees = (item.customs_fees && parseFloat(item.customs_fees) > 0) ? item.customs_fees : calculateSmartCustoms(item);
            csvContent += `${item.tracking_number},"${item.user_name}","${item.destination}",${item.weight},${fFees},"${item.payment_status || 'Unpaid'}","${item.status}","${item.created_at || ''}"\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "maa_cargo_shipments_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportInvoicesLedgerCSV = () => {
        let csvContent = "\uFEFFdata:text/csv;charset=utf-8,Invoice No,Tracking Number,Client Name,Client Email,Destination,Weight (KG),Customs & Tax Fees ($),Payment Status,Status\n";
        shipments.forEach((item, index) => {
            const fFees = (item.customs_fees && parseFloat(item.customs_fees) > 0) ? item.customs_fees : calculateSmartCustoms(item);
            const invId = "INV-" + (1001 + index);
            csvContent += `${invId},${item.tracking_number},"${item.user_name}","${item.user_email}","${item.destination}",${item.weight},${fFees},"${item.payment_status || 'Unpaid'}","${item.status}"\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "maa_cargo_invoices_ledger.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleLogout = () => {
        localStorage.clear();
        setToken('');
        setIsAdmin(false);
        handleTabChange('home');
    };

    const totalShipmentsCount = shipments.length;
    const pendingCount = shipments.filter(s => s.status.includes('Pending') || s.status.includes('قيد المعالجة')).length;
    const deliveredCount = shipments.filter(s => s.status.includes('Delivered') || s.status.includes('التوصيل')).length;
    const totalFeesSum = shipments.reduce((acc, curr) => acc + parseFloat((curr.customs_fees && parseFloat(curr.customs_fees) > 0) ? curr.customs_fees : calculateSmartCustoms(curr)), 0);

    const uniqueClients = [...new Set(shipments.map(s => s.user_name))];

    const filteredShipments = shipments.filter(item => {
        const matchesStatus = filterStatus === 'ALL' || item.status.includes(filterStatus);
        const matchesClientSelect = selectedClient === 'ALL' || item.user_name === selectedClient;
        
        const searchLower = clientSearchText.toLowerCase();
        const matchesSearchText = 
            !clientSearchText || 
            (item.user_name && item.user_name.toLowerCase().includes(searchLower)) ||
            (item.user_email && item.user_email.toLowerCase().includes(searchLower)) ||
            (item.tracking_number && item.tracking_number.toLowerCase().includes(searchLower));

        return matchesStatus && matchesClientSelect && matchesSearchText;
    });

    const filteredInvoices = shipments.filter((item, index) => {
        const invoiceId = "INV-" + (1001 + index);
        const searchInv = invoiceSearchText.toLowerCase();
        return (
            !invoiceSearchText || 
            invoiceId.toLowerCase().includes(searchInv) ||
            item.tracking_number.toLowerCase().includes(searchInv) ||
            item.user_name.toLowerCase().includes(searchInv)
        );
    });

    const getStatusColor = (status) => {
        if (!status) return '#38bdf8';
        if (status.includes('Delivered') || status.includes('التوصيل')) return '#10b981';
        if (status.includes('Pending') || status.includes('المعالجة')) return '#fbbf24';
        if (status.includes('Transit') || status.includes('الشحن')) return '#38bdf8';
        return '#38bdf8';
    };

    const bgStyle = {
        minHeight: '100vh',
        backgroundColor: '#040b16',
        backgroundImage: `
            radial-gradient(circle at 15% 25%, rgba(14, 39, 77, 0.4) 0%, transparent 45%),
            radial-gradient(circle at 85% 75%, rgba(56, 189, 248, 0.08) 0%, transparent 50%),
            linear-gradient(rgba(56, 189, 248, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 50px 50px, 50px 50px',
        color: '#f8fafc',
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        direction: lang === 'ar' ? 'rtl' : 'ltr',
        textAlign: lang === 'ar' ? 'right' : 'left',
        perspective: '1200px',
        overflowX: 'hidden',
        position: 'relative'
    };

    const transitionWrapperStyle = {
        transform: isAnimating ? 'translateZ(-120px) rotateX(10deg) scale(0.97)' : 'translateZ(0px) rotateX(0deg) scale(1)',
        opacity: isAnimating ? 0 : 1,
        transition: 'transform 0.35s cubic-bezier(0.15, 0.85, 0.35, 1), opacity 0.3s ease',
        transformStyle: 'preserve-3d',
        position: 'relative',
        zIndex: 2
    };

    const card3DStyle = {
        backgroundColor: 'rgba(11, 20, 38, 0.92)',
        backdropFilter: 'blur(16px)',
        color: '#f8fafc',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.7), 0 0 25px rgba(56,189,248,0.15)',
        width: '440px',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        transform: 'translateZ(30px)',
        transition: 'transform 0.4s ease'
    };

    return (
        <div style={bgStyle}>
            {/* شريط التنقل العلوي المحدث */}
            <nav style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '18px 50px', 
                borderBottom: '1px solid rgba(56, 189, 248, 0.2)', 
                flexDirection: lang === 'ar' ? 'row-reverse' : 'row', 
                flexWrap: 'wrap', 
                gap: '15px', 
                backgroundColor: 'rgba(4, 11, 22, 0.95)', 
                backdropFilter: 'blur(15px)', 
                position: 'sticky', 
                top: 0, 
                zIndex: 1000 
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }} onClick={() => handleTabChange('home')}>
                    <div style={{ 
                        width: '48px', 
                        height: '48px', 
                        background: 'linear-gradient(135deg, #38bdf8, #0284c7, #d4af37)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        color: '#040b16', 
                        fontWeight: 'bold', 
                        fontSize: '22px', 
                        borderRadius: '10px', 
                        boxShadow: '0 4px 15px rgba(56,189,248,0.4)' 
                    }}>✈</div>
                    <div style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                        <div style={{ fontWeight: '800', letterSpacing: '2px', fontSize: '20px', color: '#f8fafc' }}>{currentText.brand}</div>
                        <div style={{ fontSize: '10px', color: '#38bdf8', letterSpacing: '3px', fontWeight: '600' }}>ADMIN OPERATIONS HUB</div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '30px', alignItems: 'center', fontSize: '14px', fontWeight: '600', flexDirection: lang === 'ar' ? 'row-reverse' : 'row', flexWrap: 'wrap' }}>
                    <span onClick={() => handleTabChange('home')} style={{ cursor: 'pointer', color: activeTab === 'home' ? '#38bdf8' : '#94a3b8', transition: 'color 0.2s' }}>{currentText.home}</span>
                    {token && (
                        <>
                            <span onClick={() => handleTabChange('dashboard')} style={{ cursor: 'pointer', color: activeTab === 'dashboard' ? '#38bdf8' : '#94a3b8', transition: 'color 0.2s' }}>{currentText.shipmentsTab}</span>
                            <span onClick={() => handleTabChange('invoices')} style={{ cursor: 'pointer', color: activeTab === 'invoices' ? '#38bdf8' : '#94a3b8', transition: 'color 0.2s' }}>{currentText.invoicesTab}</span>
                        </>
                    )}
                    {token ? (
                        <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '6px', boxShadow: '0 4px 12px rgba(239,68,68,0.3)' }}>{currentText.logout}</button>
                    ) : (
                        <button onClick={() => handleTabChange('login')} style={{ padding: '9px 22px', background: 'linear-gradient(135deg, #38bdf8, #0284c7)', color: '#040b16', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '6px', boxShadow: '0 4px 15px rgba(56,189,248,0.4)' }}>{currentText.signIn}</button>
                    )}
                    <button 
                        onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} 
                        style={{ padding: '6px 14px', background: 'transparent', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', borderRadius: '6px' }}>
                        {lang === 'ar' ? 'EN' : 'عربي'}
                    </button>
                </div>
            </nav>

            <div style={{ padding: '40px 50px', ...transitionWrapperStyle }}>
                
                {activeTab === 'home' && (
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{ 
                            textAlign: 'center', 
                            padding: '80px 20px', 
                            background: 'linear-gradient(180deg, rgba(14, 39, 77, 0.4) 0%, rgba(4, 11, 22, 0.2) 100%)', 
                            borderRadius: '16px', 
                            border: '1px solid rgba(56, 189, 248, 0.15)', 
                            marginBottom: '70px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ fontSize: '12px', letterSpacing: '4px', color: '#38bdf8', marginBottom: '15px', fontWeight: 'bold', textTransform: 'uppercase' }}>{currentText.adminCenter}</div>
                            <h1 style={{ fontSize: '48px', color: '#fff', marginBottom: '20px', lineHeight: '1.2', fontWeight: '800' }}>{currentText.heroTitle}</h1>
                            <p style={{ color: '#94a3b8', fontSize: '17px', maxWidth: '800px', margin: '0 auto 40px auto', lineHeight: '1.7' }}>{currentText.heroDesc}</p>
                            <button onClick={() => handleTabChange(token ? 'dashboard' : 'login')} style={{ padding: '16px 36px', background: 'linear-gradient(135deg, #38bdf8, #0284c7)', color: '#040b16', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', borderRadius: '8px', boxShadow: '0 8px 25px rgba(56,189,248,0.4)', transition: 'transform 0.2s' }}>
                                {currentText.getStartedBtn} ✈
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '70px' }}>
                            <div style={{ background: 'rgba(11, 20, 38, 0.85)', backdropFilter: 'blur(12px)', padding: '35px', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.2)', boxShadow: '0 15px 35px rgba(0,0,0,0.4)', borderTop: '4px solid #38bdf8' }}>
                                <div style={{ fontSize: '32px', marginBottom: '15px' }}>⚡</div>
                                <h3 style={{ color: '#38bdf8', marginBottom: '12px', fontSize: '20px', fontWeight: '700' }}>{currentText.feature1Title}</h3>
                                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.7' }}>{currentText.feature1Desc}</p>
                            </div>
                            <div style={{ background: 'rgba(11, 20, 38, 0.85)', backdropFilter: 'blur(12px)', padding: '35px', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.2)', boxShadow: '0 15px 35px rgba(0,0,0,0.4)', borderTop: '4px solid #10b981' }}>
                                <div style={{ fontSize: '32px', marginBottom: '15px' }}>📄</div>
                                <h3 style={{ color: '#10b981', marginBottom: '12px', fontSize: '20px', fontWeight: '700' }}>{currentText.feature2Title}</h3>
                                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.7' }}>{currentText.feature2Desc}</p>
                            </div>
                            <div style={{ background: 'rgba(11, 20, 38, 0.85)', backdropFilter: 'blur(12px)', padding: '35px', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.2)', boxShadow: '0 15px 35px rgba(0,0,0,0.4)', borderTop: '4px solid #38bdf8' }}>
                                <div style={{ fontSize: '32px', marginBottom: '15px' }}>🛡️</div>
                                <h3 style={{ color: '#38bdf8', marginBottom: '12px', fontSize: '20px', fontWeight: '700' }}>{currentText.feature3Title}</h3>
                                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.7' }}>{currentText.feature3Desc}</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'login' && !token && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                        <div style={card3DStyle}>
                            <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#38bdf8', textAlign: 'center', marginBottom: '10px', fontWeight: 'bold' }}>{currentText.operatorAccess}</div>
                            <h2 style={{ textAlign: 'center', marginBottom: '8px', color: '#f8fafc', fontWeight: '800' }}>{isRegistering ? currentText.createAccount : currentText.signInTitle}</h2>
                            <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginBottom: '25px' }}>{currentText.signInDesc}</p>

                            {isRegistering ? (
                                <form onSubmit={handleRegister} style={{ display: 'grid', gap: '15px' }}>
                                    <div>
                                        <label style={{ fontSize: '12px', display: 'block', marginBottom: '5px', color: '#94a3b8' }}>{currentText.fullName}</label>
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '12px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', boxSizing: 'border-box', borderRadius: '6px' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '12px', display: 'block', marginBottom: '5px', color: '#94a3b8' }}>{currentText.emailLabel}</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', boxSizing: 'border-box', borderRadius: '6px' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '12px', display: 'block', marginBottom: '5px', color: '#94a3b8' }}>{currentText.passLabel}</label>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', boxSizing: 'border-box', borderRadius: '6px' }} />
                                    </div>
                                    <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #38bdf8, #0284c7)', color: '#040b16', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px' }}>{currentText.registerBtn}</button>
                                </form>
                            ) : (
                                <form onSubmit={handleLogin} style={{ display: 'grid', gap: '15px' }}>
                                    <div>
                                        <label style={{ fontSize: '12px', display: 'block', marginBottom: '5px', color: '#94a3b8' }}>{currentText.emailLabel}</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '12px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', boxSizing: 'border-box', borderRadius: '6px' }} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '12px', display: 'block', marginBottom: '5px', color: '#94a3b8' }}>{currentText.passLabel}</label>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '12px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', boxSizing: 'border-box', borderRadius: '6px' }} />
                                    </div>
                                    <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #38bdf8, #0284c7)', color: '#040b16', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px' }}>{currentText.loginBtn}</button>
                                </form>
                            )}

                            <p onClick={() => setIsRegistering(!isRegistering)} style={{ textAlign: 'center', marginTop: '20px', color: '#38bdf8', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                                {isRegistering ? currentText.hasAccount : currentText.noAccount}
                            </p>
                        </div>
                    </div>
                )}

                {activeTab === 'dashboard' && token && (
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
                            <div>
                                <h2 style={{ color: '#38bdf8', margin: 0, fontWeight: '800' }}>MAA-CARGO Admin Console</h2>
                                <p style={{ color: '#94a3b8', fontSize: '13px', margin: '5px 0 0' }}>{currentText.manageSubTitle}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={fetchShipments} style={{ padding: '10px 16px', background: '#0284c7', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px' }}>
                                    🔄 {currentText.refreshBtn}
                                </button>
                                <button onClick={exportToCSV} style={{ padding: '10px 16px', background: '#10b981', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px' }}>
                                    📊 {currentText.exportCSV}
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                            <div style={{ background: 'rgba(11, 20, 38, 0.85)', backdropFilter: 'blur(12px)', padding: '20px', border: '1px solid rgba(56,189,248,0.2)', borderRight: lang === 'ar' ? '4px solid #38bdf8' : 'none', borderLeft: lang === 'ar' ? 'none' : '4px solid #38bdf8', borderRadius: '8px' }}>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{currentText.totalShipments}</div>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginTop: '5px' }}>{totalShipmentsCount}</div>
                            </div>
                            <div style={{ background: 'rgba(11, 20, 38, 0.85)', backdropFilter: 'blur(12px)', padding: '20px', border: '1px solid rgba(56,189,248,0.2)', borderRight: lang === 'ar' ? '4px solid #fbbf24' : 'none', borderLeft: lang === 'ar' ? 'none' : '4px solid #fbbf24', borderRadius: '8px' }}>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{currentText.pendingShipments}</div>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginTop: '5px' }}>{pendingCount}</div>
                            </div>
                            <div style={{ background: 'rgba(11, 20, 38, 0.85)', backdropFilter: 'blur(12px)', padding: '20px', border: '1px solid rgba(56,189,248,0.2)', borderRight: lang === 'ar' ? '4px solid #10b981' : 'none', borderLeft: lang === 'ar' ? 'none' : '4px solid #10b981', borderRadius: '8px' }}>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{currentText.deliveredShipments}</div>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginTop: '5px' }}>{deliveredCount}</div>
                            </div>
                            <div style={{ background: 'rgba(11, 20, 38, 0.85)', backdropFilter: 'blur(12px)', padding: '20px', border: '1px solid rgba(56,189,248,0.2)', borderRight: lang === 'ar' ? '4px solid #38bdf8' : 'none', borderLeft: lang === 'ar' ? 'none' : '4px solid #38bdf8', borderRadius: '8px' }}>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{currentText.totalRevenue}</div>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginTop: '5px' }}>${totalFeesSum.toFixed(2)}</div>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(11, 20, 38, 0.85)', backdropFilter: 'blur(12px)', padding: '25px', border: '1px solid rgba(56,189,248,0.2)', marginBottom: '30px', borderRadius: '10px' }}>
                            <h3 style={{ color: '#38bdf8', textAlign: 'center', marginBottom: '20px', fontSize: '18px', fontWeight: '700' }}>{currentText.quickLookup}</h3>
                            <form onSubmit={handleTrackSearch} style={{ display: 'flex', gap: '10px', maxWidth: '800px', margin: '0 auto', flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }}>
                                <button type="submit" style={{ padding: '12px 25px', background: 'linear-gradient(135deg, #38bdf8, #0284c7)', color: '#040b16', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px' }}>
                                    {currentText.search}
                                </button>
                                <input 
                                    type="text" 
                                    placeholder={currentText.waybillPlaceholder} 
                                    value={trackingInput} 
                                    onChange={(e) => setTrackingInput(e.target.value)} 
                                    required 
                                    style={{ flex: 1, padding: '12px 15px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', outline: 'none', borderRadius: '6px', textAlign: lang === 'ar' ? 'right' : 'left' }} 
                                />
                            </form>

                            {trackingResult && (
                                <div style={{ marginTop: '20px', background: '#040b16', padding: '20px', border: '1px solid #38bdf8', borderRadius: '8px' }}>
                                    <div style={{ color: '#38bdf8', fontWeight: 'bold', marginBottom: '8px' }}>{currentText.searchResults} {trackingResult.tracking_number}</div>
                                    <div><strong>{currentText.status}</strong> {trackingResult.status}</div>
                                    <div><strong>{currentText.destination}</strong> {trackingResult.destination}</div>
                                    <div><strong>{currentText.weight}</strong> {trackingResult.weight} KG</div>
                                    <div><strong>{currentText.description}</strong> {trackingResult.description}</div>
                                </div>
                            )}
                        </div>

                        <div style={{ background: 'rgba(11, 20, 38, 0.85)', backdropFilter: 'blur(12px)', padding: '20px 25px', border: '1px solid rgba(56,189,248,0.2)', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', borderRadius: '10px' }}>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {[
                                    { key: 'ALL', label: currentText.allStatus },
                                    { key: 'Pending', label: currentText.pendingStatus },
                                    { key: 'Received', label: currentText.receivedStatus },
                                    { key: 'Transit', label: currentText.transitStatus },
                                    { key: 'Arrived', label: currentText.arrivedStatus },
                                    { key: 'Delivered', label: currentText.deliveredStatus }
                                ].map((statusObj) => (
                                    <button 
                                        key={statusObj.key}
                                        onClick={() => setFilterStatus(statusObj.key)}
                                        style={{ 
                                            padding: '8px 14px', 
                                            background: filterStatus === statusObj.key ? '#38bdf8' : '#040b16', 
                                            color: filterStatus === statusObj.key ? '#040b16' : '#fff', 
                                            border: '1px solid rgba(56,189,248,0.3)', 
                                            cursor: 'pointer', 
                                            fontSize: '12px', 
                                            fontWeight: 'bold',
                                            borderRadius: '6px'
                                        }}>
                                        {statusObj.label}
                                    </button>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <input 
                                    type="text" 
                                    placeholder={currentText.clientSearchPlaceholder} 
                                    value={clientSearchText} 
                                    onChange={(e) => setClientSearchText(e.target.value)} 
                                    style={{ padding: '8px 14px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', fontSize: '12px', outline: 'none', borderRadius: '6px', width: '200px', textAlign: lang === 'ar' ? 'right' : 'left' }} 
                                />
                                <select 
                                    value={selectedClient} 
                                    onChange={(e) => setSelectedClient(e.target.value)}
                                    style={{ padding: '8px 12px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', fontSize: '12px', borderRadius: '6px', outline: 'none' }}>
                                    <option value="ALL">{currentText.allClients}</option>
                                    {uniqueClients.map((client, idx) => (
                                        <option key={idx} value={client}>{client}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(11, 20, 38, 0.9)', backdropFilter: 'blur(12px)', padding: '25px', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '10px' }}>
                            <h3 style={{ color: '#38bdf8', marginBottom: '20px', fontWeight: '800' }}>{currentText.managementTitle} ({filteredShipments.length})</h3>
                            {filteredShipments.length === 0 ? <p style={{ color: '#888' }}>{currentText.noShipments}</p> : (
                                <div style={{ display: 'grid', gap: '20px' }}>
                                    {filteredShipments.map((item) => {
                                        const displayFees = (item.customs_fees && parseFloat(item.customs_fees) > 0) ? item.customs_fees : calculateSmartCustoms(item);
                                        const isPaid = item.payment_status === 'Paid';

                                        const descText = item.description || '';
                                        let sourceVal = "محلية / عامة";
                                        let packagesVal = "1 طرد";
                                        let shippingTypeVal = "تسليم المطار (Airport-to-Airport)";
                                        let receiverPhoneVal = "غير متوفر";
                                        let receiverIdVal = "غير متوفر";
                                        let receiverAddressVal = "غير متوفر";
                                        let declaredValueVal = "$0";
                                        let notesVal = "لايوجد";

                                        if (descText.includes('المصدر:')) {
                                            const parts = descText.split('|');
                                            parts.forEach(p => {
                                                if (p.includes('المصدر:')) sourceVal = p.replace('المصدر:', '').trim();
                                                if (p.includes('الطرود:')) packagesVal = p.replace('الطرود:', '').trim();
                                                if (p.includes('التسليم:')) shippingTypeVal = p.replace('التسليم:', '').trim();
                                                if (p.includes('هاتف المستلم:')) receiverPhoneVal = p.replace('هاتف المستلم:', '').trim();
                                                if (p.includes('الرقم الوطني:')) receiverIdVal = p.replace('الرقم الوطني:', '').trim();
                                                if (p.includes('عنوان المستلم:')) receiverAddressVal = p.replace('عنوان المستلم:', '').trim();
                                                if (p.includes('القيمة المعلنة:')) declaredValueVal = p.replace('القيمة المعلنة:', '').trim();
                                                if (p.includes('ملاحظات:')) notesVal = p.replace('ملاحظات:', '').trim();
                                            });
                                        } else {
                                            sourceVal = descText || "شحنة عامة";
                                        }

                                        return (
                                            <div key={item.id} style={{ background: '#040b16', padding: '25px', border: '1px solid rgba(56,189,248,0.2)', borderRight: lang === 'ar' ? `4px solid ${getStatusColor(item.status)}` : 'none', borderLeft: lang === 'ar' ? 'none' : `4px solid ${getStatusColor(item.status)}`, borderRadius: '8px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                                                    <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px' }}>WAYBILL: {item.tracking_number}</span>
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        <span style={{ padding: '4px 12px', background: isPaid ? '#10b981' : '#ef4444', color: '#fff', fontWeight: 'bold', fontSize: '12px', borderRadius: '6px' }}>
                                                            {isPaid ? currentText.paidStatusText : currentText.unpaidStatusText}
                                                        </span>
                                                        <span style={{ padding: '4px 12px', background: getStatusColor(item.status), color: '#040b16', fontWeight: 'bold', fontSize: '12px', borderRadius: '6px' }}>
                                                            {item.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '15px' }}>
                                                    <strong>{currentText.client}</strong> {item.user_name} ({item.user_email})
                                                </div>

                                                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', background: 'rgba(14, 39, 77, 0.4)', padding: '15px', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '6px', marginBottom: '20px', gap: '15px', alignItems: 'center' }}>
                                                    <div>
                                                        <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '3px' }}>{currentText.destination}</div>
                                                        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>{item.destination}</div>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '3px' }}>{currentText.weight}</div>
                                                        <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>{item.weight} KG</div>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '3px' }}>{currentText.fees}</div>
                                                        <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '16px' }}>${displayFees}</div>
                                                    </div>
                                                </div>

                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '20px' }}>
                                                    <div style={{ background: 'rgba(14, 39, 77, 0.3)', padding: '10px', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '6px' }}><span style={{ color: '#94a3b8', fontSize: '11px', display: 'block' }}>المصدر</span><strong style={{ color: '#fff', fontSize: '12px' }}>{sourceVal}</strong></div>
                                                    <div style={{ background: 'rgba(14, 39, 77, 0.3)', padding: '10px', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '6px' }}><span style={{ color: '#94a3b8', fontSize: '11px', display: 'block' }}>الطرود</span><strong style={{ color: '#fff', fontSize: '12px' }}>{packagesVal}</strong></div>
                                                    <div style={{ background: 'rgba(14, 39, 77, 0.3)', padding: '10px', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '6px' }}><span style={{ color: '#94a3b8', fontSize: '11px', display: 'block' }}>التسليم</span><strong style={{ color: '#fff', fontSize: '12px' }}>{shippingTypeVal}</strong></div>
                                                    <div style={{ background: 'rgba(14, 39, 77, 0.3)', padding: '10px', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '6px' }}><span style={{ color: '#94a3b8', fontSize: '11px', display: 'block' }}>هاتف المستلم</span><strong style={{ color: '#fff', fontSize: '12px' }}>{receiverPhoneVal}</strong></div>
                                                    <div style={{ background: 'rgba(14, 39, 77, 0.3)', padding: '10px', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '6px' }}><span style={{ color: '#94a3b8', fontSize: '11px', display: 'block' }}>الرقم الوطني</span><strong style={{ color: '#fff', fontSize: '12px' }}>{receiverIdVal}</strong></div>
                                                    <div style={{ background: 'rgba(14, 39, 77, 0.3)', padding: '10px', border: '1px solid rgba(56,189,248,0.15)', borderRadius: '6px' }}><span style={{ color: '#94a3b8', fontSize: '11px', display: 'block' }}>عنوان المستلم</span><strong style={{ color: '#fff', fontSize: '12px' }}>{receiverAddressVal}</strong></div>
                                                </div>

                                                <div style={{ display: 'flex', gap: '10px', marginTop: '15px', flexWrap: 'wrap' }}>
                                                    {editingShipment !== item.id ? (
                                                        <>
                                                            <button onClick={() => { 
                                                                setEditingShipment(item.id); 
                                                                setEditStatus(item.status); 
                                                                setEditDestination(item.destination); 
                                                                setEditPaymentStatus(item.payment_status || 'Unpaid');
                                                                setEditWeight(item.weight);
                                                                setEditReceiverAddress(receiverAddressVal !== "غير متوفر" ? receiverAddressVal : "");
                                                                setEditPackages(packagesVal.replace(/[^0-9]/g, '') || "1");
                                                                setEditDeclaredValue(declaredValueVal.replace(/[^0-9.]/g, '') || "0");
                                                                setEditFees(item.customs_fees && parseFloat(item.customs_fees) > 0 ? item.customs_fees : calculateSmartCustoms(item)); 
                                                            }} style={{ padding: '8px 15px', background: '#0284c7', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '6px' }}>
                                                                {currentText.editStatusRoute}
                                                            </button>
                                                            <button onClick={() => handlePrintWaybill(item)} style={{ padding: '8px 15px', background: '#38bdf8', color: '#040b16', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '6px' }}>
                                                                🖨️ {currentText.printWaybill}
                                                            </button>
                                                            <button onClick={() => handlePrintInvoice(item, "INV-1001")} style={{ padding: '8px 15px', background: '#10b981', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '6px' }}>
                                                                📄 {currentText.printInvoice}
                                                            </button>
                                                        </>
                                                    ) : null}
                                                    <button onClick={() => handleDeleteShipment(item.id)} style={{ padding: '8px 15px', background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '6px' }}>
                                                        {currentText.deleteWaybill}
                                                    </button>
                                                </div>

                                                {editingShipment === item.id && (
                                                    <form onSubmit={(e) => handleUpdateStatus(e, item)} style={{ marginTop: '15px', background: 'rgba(14, 39, 77, 0.8)', padding: '20px', border: '1px solid #38bdf8', display: 'grid', gap: '15px', borderRadius: '8px' }}>
                                                        <div>
                                                            <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>{currentText.updateStatus}</label>
                                                            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} required style={{ width: '100%', padding: '10px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', borderRadius: '6px' }}>
                                                                <option value="قيد المعالجة (Pending)">{lang === 'ar' ? 'قيد المعالجة (Pending)' : 'Pending'}</option>
                                                                <option value="تم استلام الشحنة (Received)">{lang === 'ar' ? 'تم استلام الشحنة (Received)' : 'Received'}</option>
                                                                <option value="في طريقها للشحن الجوي (In Transit)">{lang === 'ar' ? 'في طريقها للشحن الجوي (In Transit)' : 'In Transit'}</option>
                                                                <option value="وصلت بلد المقصد (Arrived)">{lang === 'ar' ? 'وصلت بلد المقصد (Arrived)' : 'Arrived'}</option>
                                                                <option value="تم التوصيل بنجاح (Delivered)">{lang === 'ar' ? 'تم التوصيل بنجاح (Delivered)' : 'Delivered'}</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>{currentText.updateRoute}</label>
                                                            <select value={editDestination} onChange={(e) => setEditDestination(e.target.value)} required style={{ width: '100%', padding: '10px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', borderRadius: '6px' }}>
                                                                <option value="">{currentText.selectDestination}</option>
                                                                {currentText.destinations.map((dest, dIdx) => (
                                                                    <option key={dIdx} value={dest.value}>{dest.label}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                                            <div>
                                                                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>{currentText.weight}</label>
                                                                <input type="number" step="0.1" value={editWeight} onChange={(e) => setEditWeight(e.target.value)} required style={{ width: '100%', padding: '10px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', borderRadius: '6px', boxSizing: 'border-box' }} />
                                                            </div>
                                                            <div>
                                                                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>{currentText.packagesLabel}</label>
                                                                <input type="number" value={editPackages} onChange={(e) => setEditPackages(e.target.value)} required style={{ width: '100%', padding: '10px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', borderRadius: '6px', boxSizing: 'border-box' }} />
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                                            <div>
                                                                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>{currentText.declaredValueLabel}</label>
                                                                <input type="number" step="0.01" value={editDeclaredValue} onChange={(e) => setEditDeclaredValue(e.target.value)} required style={{ width: '100%', padding: '10px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', borderRadius: '6px', boxSizing: 'border-box' }} />
                                                            </div>
                                                            <div>
                                                                <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>{currentText.receiverAddressLabel}</label>
                                                                <input type="text" value={editReceiverAddress} onChange={(e) => setEditReceiverAddress(e.target.value)} required style={{ width: '100%', padding: '10px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', borderRadius: '6px', boxSizing: 'border-box' }} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>{currentText.updatePaymentStatus}</label>
                                                            <select value={editPaymentStatus} onChange={(e) => setEditPaymentStatus(e.target.value)} required style={{ width: '100%', padding: '10px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', borderRadius: '6px' }}>
                                                                <option value="Paid">{currentText.paidStatusText}</option>
                                                                <option value="Unpaid">{currentText.unpaidStatusText}</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                                                <label style={{ fontSize: '11px', color: '#94a3b8' }}>{currentText.customsFees}</label>
                                                                <button 
                                                                    type="button" 
                                                                    onClick={() => setEditFees(calculateSmartCustomsCustom(editWeight, item.description, editPackages, editDeclaredValue))}
                                                                    style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '4px 10px', fontSize: '11px', cursor: 'pointer', borderRadius: '4px' }}>
                                                                    ⚡ {currentText.autoCalculate}
                                                                </button>
                                                            </div>
                                                            <input type="number" step="0.01" value={editFees} onChange={(e) => setEditFees(e.target.value)} placeholder="0.00" style={{ width: '100%', padding: '10px', background: '#040b16', border: '1px solid rgba(56,189,248,0.3)', color: '#fff', borderRadius: '6px', boxSizing: 'border-box' }} />
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '10px' }}>
                                                            <button type="submit" style={{ padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '6px' }}>{currentText.saveChanges}</button>
                                                            <button type="button" onClick={() => setEditingShipment(null)} style={{ padding: '10px 20px', background: '#64748b', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '6px' }}>{currentText.cancel}</button>
                                                        </div>
                                                    </form>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'invoices' && token && (
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
                            <div>
                                <h2 style={{ color: '#38bdf8', margin: 0, fontWeight: '800' }}>MAA-CARGO Invoices & Ledger</h2>
                                <p style={{ color: '#94a3b8', fontSize: '13px', margin: '5px 0 0' }}>{currentText.financialSubTitle}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <input 
                                    type="text" 
                                    placeholder={currentText.invoiceSearchPlaceholder} 
                                    value={invoiceSearchText} 
                                    onChange={(e) => setInvoiceSearchText(e.target.value)} 
                                    style={{ padding: '10px 14px', background: '#040b16', border: '1px solid rgba(56,189,248,0.4)', color: '#fff', fontSize: '13px', width: '220px', outline: 'none', borderRadius: '6px', textAlign: lang === 'ar' ? 'right' : 'left' }} 
                                />
                                <button onClick={handlePrintMasterLedger} style={{ padding: '10px 16px', background: 'linear-gradient(135deg, #38bdf8, #0284c7)', color: '#040b16', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px' }}>
                                    🖨️ {currentText.printMasterLedger}
                                </button>
                                <button onClick={exportInvoicesLedgerCSV} style={{ padding: '10px 16px', background: '#10b981', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '6px' }}>
                                    📊 {currentText.exportInvoicesCSV}
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                            <div style={{ background: 'rgba(11, 20, 38, 0.85)', backdropFilter: 'blur(12px)', padding: '20px', border: '1px solid rgba(56,189,248,0.2)', borderRight: lang === 'ar' ? '4px solid #38bdf8' : 'none', borderLeft: lang === 'ar' ? 'none' : '4px solid #38bdf8', borderRadius: '8px' }}>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{currentText.totalInvoicesIssued}</div>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginTop: '5px' }}>{shipments.length} {currentText.invoicesCountSuffix}</div>
                            </div>
                            <div style={{ background: 'rgba(11, 20, 38, 0.85)', backdropFilter: 'blur(12px)', padding: '20px', border: '1px solid rgba(56,189,248,0.2)', borderRight: lang === 'ar' ? '4px solid #10b981' : 'none', borderLeft: lang === 'ar' ? 'none' : '4px solid #10b981', borderRadius: '8px' }}>
                                <div style={{ fontSize: '12px', color: '#94a3b8' }}>{currentText.totalCustomsCollection}</div>
                                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginTop: '5px' }}>${totalFeesSum.toFixed(2)}</div>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(11, 20, 38, 0.9)', backdropFilter: 'blur(12px)', padding: '25px', border: '1px solid rgba(56,189,248,0.2)', overflowX: 'auto', borderRadius: '10px' }}>
                            <h3 style={{ color: '#38bdf8', marginBottom: '20px', fontWeight: '800' }}>{currentText.invoicesTitle} ({filteredInvoices.length})</h3>
                            {filteredInvoices.length === 0 ? <p style={{ color: '#888' }}>{currentText.noShipments}</p> : (
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: lang === 'ar' ? 'right' : 'left' }}>
                                    <thead>
                                        <tr style={{ background: '#040b16', color: '#38bdf8' }}>
                                            <th style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.2)' }}>{currentText.invoiceNo}</th>
                                            <th style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.2)' }}>{currentText.waybillNo}</th>
                                            <th style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.2)' }}>{currentText.clientName}</th>
                                            <th style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.2)' }}>{currentText.destination}</th>
                                            <th style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.2)' }}>{currentText.weight}</th>
                                            <th style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.2)' }}>{currentText.fees} ($)</th>
                                            <th style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.2)' }}>{currentText.paymentCol}</th>
                                            <th style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.2)' }}>{currentText.status}</th>
                                            <th style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.2)' }}>{currentText.invoiceActions}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredInvoices.map((item, idx) => {
                                            const displayFees = (item.customs_fees && parseFloat(item.customs_fees) > 0) ? item.customs_fees : calculateSmartCustoms(item);
                                            const originalIndex = shipments.findIndex(s => s.id === item.id);
                                            const invoiceId = "INV-" + (1001 + originalIndex);
                                            const isPaid = item.payment_status === 'Paid';

                                            return (
                                                <tr key={item.id} style={{ background: idx % 2 === 0 ? '#040b16' : 'rgba(14, 39, 77, 0.4)' }}>
                                                    <td style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.15)', color: '#38bdf8', fontWeight: 'bold' }}>{invoiceId}</td>
                                                    <td style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.15)', color: '#f8fafc', direction: 'ltr' }}>{item.tracking_number}</td>
                                                    <td style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.15)' }}>{item.user_name}</td>
                                                    <td style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.15)' }}>{item.destination}</td>
                                                    <td style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.15)' }}>{item.weight} KG</td>
                                                    <td style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.15)', fontWeight: 'bold', color: '#10b981' }}>${displayFees}</td>
                                                    <td style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.15)' }}>
                                                        <span style={{ padding: '3px 8px', background: isPaid ? '#10b981' : '#ef4444', color: '#fff', fontSize: '11px', fontWeight: 'bold', borderRadius: '4px' }}>
                                                            {isPaid ? currentText.paidStatusText : currentText.unpaidStatusText}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.15)' }}>
                                                        <span style={{ padding: '3px 8px', background: getStatusColor(item.status), color: '#040b16', fontSize: '11px', fontWeight: 'bold', borderRadius: '4px' }}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '12px', border: '1px solid rgba(56,189,248,0.15)' }}>
                                                        <button onClick={() => handlePrintInvoice(item, invoiceId)} style={{ padding: '6px 12px', background: '#38bdf8', color: '#040b16', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', borderRadius: '4px' }}>
                                                            {currentText.printInvoiceBtn}
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}