# Data Contract (Giai doan 2)

Tai lieu nay mo ta quy trinh quan ly schema, version, migration va guardrails cho du lieu.

## 1) Cau truc thu muc
- data/schemas/<dataset>/<version>.json: schema theo phien ban.
- data/schemas/<dataset>.schema.json: schema latest (giu de tooling khong gay).
- data/migrations/<dataset>/<from>__to__<to>.mjs: migration theo cap (SemVer).
- data/scripts/validate_contract.mjs: validate schema + checksum + guardrails.
- data/scripts/migrate_contract.mjs: migrate + backup + validate + update manifest.
- data/audit/: log JSONL khi migrate.
- data/contract.manifest.json: manifest hop dong (tieng Viet).

## 2) Bump version schema
1) Tao schema moi trong data/schemas/<dataset>/<version>.json.
2) Cap nhat data/schemas/<dataset>.schema.json neu can (latest).
3) Cap nhat manifest:
   - phienBanSchema = <version>
   - schema = duong dan schema moi
4) Neu MAJOR tang: bat buoc co migration tu phienBanDuLieu -> phienBanSchema.

## 3) Migrate du lieu
- Dry run (khong ghi):
  node data/scripts/migrate_contract.mjs --dataset threads --from 0.1.0 --to 1.0.0 --dry-run
- Chay that:
  node data/scripts/migrate_contract.mjs --dataset threads --from 0.1.0 --to 1.0.0
  Ket qua:
  - Tao file .bak
  - Validate schema moi
  - Update manifest (phienBanDuLieu + checksum)
  - Ghi audit JSONL

## 4) Validate hop dong
- npm run validate:data
- Neu checksum lech hoac schema FAIL thi exit 1.

## 5) Guardrails (CI)
- CI luon chay validate:data.
- Neu phienBanSchema MAJOR tang, CI se dry-run migration.

Luu y: Khong them field version/audit vao tung record de tranh gay backward compatibility.
