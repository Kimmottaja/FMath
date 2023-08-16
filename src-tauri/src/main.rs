#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::Manager;
use window_shadows::set_shadow;
use window_vibrancy::apply_mica;
use font_loader::system_fonts;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
  format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn font_list() -> String {
  format!("{:?}", system_fonts::query_all())
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
      .invoke_handler(tauri::generate_handler![greet])
      .invoke_handler(tauri::generate_handler![font_list])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}