// Composant Upload — components/Upload
//formats JPG/PNG/WEBP/PDF, taille max 10 Mo photo / 20 Mo document)
import { useState } from "react";
import { Loader } from "./Loader";

export function validateFile(
  file: File,
  accept: string,
  maxSizeMb: number
): string | null {
  const acceptedTypes = accept.split(",").map((type) => type.trim());
  const typeOk = acceptedTypes.some((type) => {
    if (type === "image/*") return file.type.startsWith("image/");
    return file.type === type;
  });
  if (!typeOk) {
    return "Format de fichier non autorisé.";
  }

  const maxSizeBytes = maxSizeMb * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `Le fichier dépasse la taille maximale autorisée (${maxSizeMb} Mo).`;
  }

  return null; // pas d'erreur = fichier valide
}

export function Upload({
  onUpload,
  accept = "image/*",
  maxSizeMb = 10,
}: {
  onUpload: (file: File) => Promise<void>;
  accept?: string;
  maxSizeMb?: number;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    //Il faut une validation avant toute tentative d'envoi
    const validationError = validateFile(file, accept, maxSizeMb);
    if (validationError) {
      setError(validationError);
      setPreview(null);
      return;
    }

    setError(null);
    if (file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    }

    setLoading(true);
    try {
      await onUpload(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi du fichier.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-asphalt-600 px-4 py-6 text-center text-sm text-sand-300 hover:border-asphalt-500">
        <span>Cliquez pour choisir un fichier ({accept}, max {maxSizeMb} Mo)</span>
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={loading}
          className="hidden"
        />
      </label>

      {preview && (
        <img src={preview} alt="Aperçu" className="h-24 w-24 rounded-lg object-cover" />
      )}

      {loading && <Loader label="Envoi du fichier…" />}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}