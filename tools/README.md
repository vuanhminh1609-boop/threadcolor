# TCH Import

Convert Wilcom/Hatch `.tch` thread charts into the app dataset.

## Usage

```bash
npm run import:tch -- --in data/raw_tch --out data/threads.generated.json
```

Defaults are `data/raw_tch` (input) and `data/threads.generated.json` (output). The script will create folders if missing.

## Format

Each non-empty line in `.tch` (plain text CSV):

```
code, brand, name, thickness, R, G, B
```

or, without thickness:

```
code, brand, name, R, G, B
```

Example:

```
310, DMC, Black, A, 0, 0, 0
```

## Firestore rules

Rules for crowd submissions live in `firestore.rules`. Publish them with:

```bash
firebase deploy --only firestore:rules
```

## Admin bootstrap

You can seed an initial admin doc locally (not from the web app).

1) Provide credentials via `GOOGLE_APPLICATION_CREDENTIALS` pointing to a Firebase service account JSON (or use `gcloud auth application-default login` to set ADC). Do **not** commit the key.
2) Run:

```bash
npm install
GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccount.json npm run bootstrap:admin
```

This writes `admins/Enx4e7xn8Rfv5uY3i4qeMDkoGPh2` with role `admin`.
