#include <gtk/gtk.h>

G_DECLARE_FINAL_TYPE (TestApp, test_app, TEST, APP, GtkApplication)

struct _TestApp {
  GtkApplication parent;
};

G_DEFINE_TYPE (TestApp, test_app, GTK_TYPE_APPLICATION)

static void
test_app_init (TestApp *app)
{
}

static void
test_app_activate (GApplication *app)
{
  GtkWidget *win =
      GTK_WIDGET (gtk_application_get_active_window(GTK_APPLICATION (app)));

  if (!win)
    {
      win = gtk_application_window_new (GTK_APPLICATION (app));

      gtk_widget_show_all (win);
    }

  gtk_window_present (GTK_WINDOW (win));
}

static void
test_app_class_init(TestAppClass *klass)
{
  G_APPLICATION_CLASS (klass)->activate = test_app_activate;
}

int
main(int argc, char *argv[])
{
  gtk_init (&argc, &argv);

  GApplication *app = g_object_new (test_app_get_type (),
                                    "application-id", "org.example.TestApp.Devel",
                                    "flags", G_APPLICATION_DEFAULT_FLAGS,
                                    NULL);

  return g_application_run (app, argc, argv);
}
