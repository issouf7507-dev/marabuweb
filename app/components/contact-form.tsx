"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = "", onSuccess }) => {
  const t2 = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translatedContact = t2.raw("sheet") as {
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder?: string;
    messagePlaceholder: string;
    sendButton: string;
  };

  // Fonction de gestion du changement des champs
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Veuillez entrer une adresse email valide");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message envoyé avec succès !");
        // Réinitialiser le formulaire
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        // Appeler le callback de succès si fourni
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(data.error || "Erreur lors de l'envoi du message");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col gap-4">
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={translatedContact.namePlaceholder}
          className="w-full h-12"
          required
          disabled={isSubmitting}
        />
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder={translatedContact.emailPlaceholder}
          className="w-full h-12"
          required
          disabled={isSubmitting}
        />
        <Input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder={translatedContact.subjectPlaceholder || translatedContact.messagePlaceholder}
          className="w-full h-12"
          disabled={isSubmitting}
        />
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder={translatedContact.messagePlaceholder}
          className="resize-none h-48"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="mt-8 flex items-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-8 rounded-full hover:bg-[#1D4851] hover:text-white cursor-pointer bg-[#EDF2D0] text-[#1D4851] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Envoi...</span>
            </>
          ) : (
            translatedContact.sendButton
          )}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;

