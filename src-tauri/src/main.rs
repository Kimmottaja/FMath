#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;
use window_shadows::set_shadow;
use window_vibrancy::apply_mica;
use font_loader::system_fonts;
use dirs_next::document_dir;
use yazi::compress;
use std::fs;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[tauri::command]
fn font_list() -> String {
  format!("{:?}", system_fonts::query_all())
}

#[tauri::command]
fn get_documents_dir() -> String {
  let path = document_dir().unwrap();
  path.into_os_string().into_string().unwrap()
}

#[tauri::command]
fn compress_and_save(data: String, path: String) {
  let compressed = compress(data.as_bytes(), yazi::Format::Zlib, yazi::CompressionLevel::Default).unwrap();
  fs::write(path, compressed).unwrap();
}

#[tauri::command]
fn decompress_and_load(path: String) -> String {
  let bytes = fs::read(path).unwrap();
  let uncompressed = yazi::decompress(&bytes, yazi::Format::Zlib).unwrap().0;
  std::str::from_utf8(&uncompressed).unwrap().to_string()
}

fn main() {
  tauri::Builder::default()
      .setup(|app| {
          let window = app.get_window("main").unwrap();
          #[cfg(target_os = "windows")]
          set_shadow(&window, true).unwrap();
          #[cfg(target_os = "windows")]
          apply_mica(&window, Some(true)).unwrap();
          Ok(())
      })
      .invoke_handler(tauri::generate_handler![
        font_list,
        get_documents_dir,
        compress_and_save,
        decompress_and_load
      ])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}