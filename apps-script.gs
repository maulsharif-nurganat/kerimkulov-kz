function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Sheet "main": key | ru | kz | en
  const mainSheet = ss.getSheetByName('main');
  const main = {};
  if (mainSheet) {
    const rows = mainSheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      const [key, ru, kz, en] = rows[i];
      if (key) main[key] = { ru: ru || '', kz: kz || '', en: en || '' };
    }
  }

  // Sheet "projects": icon | title_ru | title_kz | title_en | desc_ru | desc_kz | desc_en | url
  const projSheet = ss.getSheetByName('projects');
  const projects = [];
  if (projSheet) {
    const rows = projSheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      const [icon, title_ru, title_kz, title_en, desc_ru, desc_kz, desc_en, url] = rows[i];
      if (title_ru || icon) {
        projects.push({
          icon: icon || '',
          title: { ru: title_ru || '', kz: title_kz || '', en: title_en || '' },
          desc:  { ru: desc_ru  || '', kz: desc_kz  || '', en: desc_en  || '' },
          url:   url || ''
        });
      }
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ main, projects }))
    .setMimeType(ContentService.MimeType.JSON);
}
