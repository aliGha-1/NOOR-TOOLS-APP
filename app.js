"use strict";

/* =========================================
   NOOR TOOLS
   قاعدة البيانات والحفظ المحلي
   ========================================= */

const KEY = "noor_tools_v1";

let db = {
    products: [],
    sales: [],
    purchases: [],
    settings: {
        shopName: "نور تولز",
        lowDefault: 3
    }
};


/* =========================================
   تحميل البيانات
   ========================================= */

function load() {

    try {

        const saved = localStorage.getItem(KEY);

        if (!saved) {
            return;
        }

        const data = JSON.parse(saved);

        if (
            data &&
            Array.isArray(data.products) &&
            Array.isArray(data.sales) &&
            Array.isArray(data.purchases)
        ) {

            db = {
                ...db,
                ...data,
                settings: {
                    ...db.settings,
                    ...(data.settings || {})
                }
            };

        }

    } catch (error) {

        console.warn(
            "تعذر تحميل البيانات المحفوظة",
            error
        );

    }

}


/* =========================================
   حفظ البيانات
   ========================================= */

function save() {

    try {

        localStorage.setItem(
            KEY,
            JSON.stringify(db)
        );

    } catch (error) {

        console.warn(
            "تعذر حفظ البيانات",
            error
        );

    }

}


/* =========================================
   بداية التطبيق
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        load();

        console.log(
            "NOOR TOOLS جاهز"
        );

    }
);
/* =========================================
   التنقل بين صفحات البرنامج
   ========================================= */

function showPage(pageName) {

    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active");
        });

    const targetPage = document.getElementById(
        "page-" + pageName
    );

    if (targetPage) {
        targetPage.classList.add("active");
    }

    document
        .querySelectorAll("#bottom-nav button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === pageName
            );

        });
}


/* =========================================
   تشغيل الصفحة الرئيسية
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showPage("home");

    }
);
