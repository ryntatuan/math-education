import { supabase } from "./supabase";

/**
 * Ghi nhật ký hành động admin.
 *
 * Cố ý "bắn rồi quên": đây là nhật ký kiểm toán, không phải đường điều khiển.
 * Ghi log lỗi KHÔNG được làm hỏng thao tác chính của admin — nhưng có cảnh báo
 * ra console để biết mà kiểm tra.
 */
export async function logAudit({
  action,
  entity,
  entityId,
  before,
  after,
  reason,
}) {
  try {
    const { data } = await supabase.auth.getUser();
    const actorId = data?.user?.id;
    if (!actorId) return;

    const { error } = await supabase.from("admin_audit_log").insert({
      actor_id: actorId,
      action,
      entity,
      entity_id: entityId != null ? String(entityId) : null,
      before: before ?? null,
      after: after ?? null,
      reason: reason ?? null,
    });
    if (error) console.warn("Không ghi được audit log:", error.message);
  } catch (e) {
    console.warn("Lỗi ghi audit log:", e?.message);
  }
}
